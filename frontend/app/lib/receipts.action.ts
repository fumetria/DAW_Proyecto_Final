'use server';

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
// import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/app/db/schema';
import { receiptLineTable } from './types/types';
import { eq, and, DrizzleError, desc, ilike, or, sql, count } from "drizzle-orm";
import { auth } from '@/auth';
import { computeTaxBreakdownFromGross } from './taxes';
const db = drizzle(process.env.DATABASE_URL!, { schema });


const ITEMS_PER_PAGE = 5;
export type ReceiptRow = {
    id: string;
    num_receipt: string;
    created_at: Date | null;
    total: number;
    payment_method: number | null;
    user_email: string;
    is_open: boolean | null;
};

export type ReceiptLineRow = {
    id: string;
    cod_art: string;
    article_name: string | null;
    details: string | null;
    quantity: number;
    price: number;
    base_total: number | null;
    tax_total: number | null;
    tax_value: number | null;
    total: number;
};

export type ReceiptDetail = {
    id: string;
    num_receipt: string;
    created_at: Date | null;
    base_total?: number;
    tax_total?: number;
    total: number;
    payment_method: string | null;
    user_email: string;
    lines: ReceiptLineRow[];
};

export type ReceiptViewRow = {
    id: string;
    num_receipt: string;
    created_at: Date | null;
    total: number;
    payment_method: string | null;
    user_email: string;
    is_open: boolean | null;
};

const receiptsWhere = (query: string) =>
    or(
        ilike(schema.receiptView.num_receipt, `%${query}%`),
        ilike(schema.receiptView.user_email, `%${query}%`),
        sql`${schema.receiptView.total}::text ILIKE ${`%${query}%`}`,
    );
export async function fetchFilteredReceipts(
    query: string,
    currentPage: number = 1,
): Promise<{ receipts: ReceiptViewRow[]; totalCount: number }> {
    try {
        const whereClause = receiptsWhere(query);

        const [countResult] = await db
            .select({ count: count() })
            .from(schema.receiptView)
            .where(whereClause);

        const totalCount = Number(countResult?.count ?? 0);

        const receipts = await db
            .select({
                id: schema.receiptView.id,
                num_receipt: schema.receiptView.num_receipt,
                created_at: schema.receiptView.created_at,
                total: schema.receiptView.total,
                payment_method: schema.receiptView.payment_method,
                user_email: schema.receiptView.user_email,
                is_open: schema.receiptView.is_open,
            })
            .from(schema.receiptView)
            .where(whereClause)
            .orderBy(desc(schema.receiptView.created_at))
            .limit(ITEMS_PER_PAGE)
            .offset((currentPage - 1) * ITEMS_PER_PAGE);

        return { receipts, totalCount };
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error(error.message);
        }
        return { receipts: [], totalCount: 0 };
    }
}

export async function getReceiptDetail(numReceipt: string): Promise<ReceiptDetail | null> {
    try {
        const [receipt] = await db
            .select({
                id: schema.receiptView.id,
                num_receipt: schema.receiptView.num_receipt,
                created_at: schema.receiptView.created_at,
                total: schema.receiptView.total,
                payment_method: schema.receiptView.payment_method,
                user_email: schema.receiptView.user_email,
            })
            .from(schema.receiptView)
            .where(eq(schema.receiptView.num_receipt, numReceipt));

        if (!receipt) return null;
        const [receiptTotals] = await db
            .select({
                base_total: schema.receiptsTable.base_total,
                tax_total: schema.receiptsTable.tax_total,
            })
            .from(schema.receiptsTable)
            .where(eq(schema.receiptsTable.num_receipt, numReceipt));

        const lines = await db
            .select({
                id: schema.receiptsLineTable.id,
                cod_art: schema.receiptsLineTable.cod_art,
                article_name: schema.articlesTable.name,
                details: schema.receiptsLineTable.details,
                quantity: schema.receiptsLineTable.quantity,
                price: schema.receiptsLineTable.price,
                base_total: schema.receiptsLineTable.base_total,
                tax_total: schema.receiptsLineTable.tax_total,
                tax_value: schema.receiptsLineTable.tax_value,
                total: schema.receiptsLineTable.total,
            })
            .from(schema.receiptsLineTable)
            .leftJoin(schema.articlesTable, eq(schema.receiptsLineTable.cod_art, schema.articlesTable.cod_art))
            .where(eq(schema.receiptsLineTable.receipt_id, numReceipt));

        return {
            ...receipt,
            base_total: receiptTotals?.base_total ?? undefined,
            tax_total: receiptTotals?.tax_total ?? undefined,
            lines,
        };
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error(error.message);
        }
        return null;
    }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function createReceipt(
    receiptsLineTable: receiptLineTable[],
    _totalReceipt: number,
    payment_method: number,
    clientEmail?: string | null
) {
    try {
        const session = await auth();
        if (!session?.user) return null;
        //Buscamos crear el número de ticket en formato FS26-000000
        //Las iniciales de la serie siempre será FS de Factura Simplificada
        const serie = "FS";
        //Cuando cambie el año, automáticamente actualizará la cifra del año
        const year = new Date().getFullYear() % 100;

        const userEmail = session.user.email;
        if (!userEmail) {
            throw new Error("User email not available in session");
        }
        /**
         * Drizzle no soporta transaction en NeonDB.
         */
        const [receiptCounter] = await db.select()
            .from(schema.numsReceiptsTable)
            .for('update')
            .where(
                and(
                    eq(schema.numsReceiptsTable.serie, serie),
                    eq(schema.numsReceiptsTable.year, year)))
            ;
        let nextNumber: number;
        if (!receiptCounter) {
            await db.insert(schema.numsReceiptsTable)
                .values({ serie, year, number: 1 })
                .returning();

            nextNumber = 1;
        } else {
            nextNumber = receiptCounter.number + 1;

            await db
                .update(schema.numsReceiptsTable)
                .set({ number: nextNumber })
                .where(eq(schema.numsReceiptsTable.id, receiptCounter.id));
        }

        const numReceipt = `${serie}${year}-${String(nextNumber).padStart(6, "0")}`;

        // Server-side source of truth: enrich lines with article + tax snapshot
        const requestedCodArts = Array.from(
            new Set(receiptsLineTable.map((l) => l.cod_art))
        );
        const articles = await db
            .select({
                cod_art: schema.articlesTable.cod_art,
                tax_id: schema.articlesTable.tax,
            })
            .from(schema.articlesTable)
            .where(or(...requestedCodArts.map((c) => eq(schema.articlesTable.cod_art, c))));
        const articleTaxMap = new Map(articles.map((a) => [a.cod_art, a.tax_id]));

        const taxes = await db.select().from(schema.taxesTable);
        const taxValueById = new Map(taxes.map((t) => [t.id, t.value]));

        let receiptBaseTotal = 0;
        let receiptTaxTotal = 0;
        let receiptGrossTotal = 0;

        const enrichedLines = receiptsLineTable.map((line) => {
            const taxId = articleTaxMap.get(line.cod_art) ?? null;
            const taxValue = taxId ? (taxValueById.get(taxId) ?? null) : null;
            if (taxId && taxValue == null) {
                throw new Error(`Tipo de IVA no encontrado para el artículo ${line.cod_art}`);
            }
            const qty = Number(line.quantity ?? 0);
            const grossUnit = Number(line.price ?? 0);
            const breakdown = computeTaxBreakdownFromGross(grossUnit, taxValue ?? 0);
            const baseTotal = Number((breakdown.base * qty).toFixed(2));
            const taxTotal = Number((breakdown.tax * qty).toFixed(2));
            const grossTotal = Number((breakdown.gross * qty).toFixed(2));

            receiptBaseTotal += baseTotal;
            receiptTaxTotal += taxTotal;
            receiptGrossTotal += grossTotal;

            return {
                cod_art: line.cod_art,
                details: line.details ?? null,
                quantity: qty,
                price: grossUnit,
                base_unit: breakdown.base,
                tax_unit: breakdown.tax,
                base_total: baseTotal,
                tax_total: taxTotal,
                tax_id: taxId,
                tax_value: taxValue,
                total: grossTotal,
                receipt_id: numReceipt,
            };
        });

        const receiptInsert = {
            num_receipt: numReceipt,
            serie,
            year,
            number: nextNumber,
            base_total: Number(receiptBaseTotal.toFixed(2)),
            tax_total: Number(receiptTaxTotal.toFixed(2)),
            total: Number(receiptGrossTotal.toFixed(2)),
            user_email: userEmail,
            payment_method,
            is_open: true,
        };
        const [createReceipt] = await db
            .insert(schema.receiptsTable)
            .values(receiptInsert)
            .returning({
                num_receipt: schema.receiptsTable.num_receipt,
                base_total: schema.receiptsTable.base_total,
                tax_total: schema.receiptsTable.tax_total,
                total: schema.receiptsTable.total,
                create_at: schema.receiptsTable.created_at
            });

        await db.insert(schema.receiptsLineTable).values(enrichedLines);

        const emailToUse = typeof clientEmail === "string" ? clientEmail.trim() : "";
        if (emailToUse && EMAIL_REGEX.test(emailToUse)) {
            try {
                const { generateReceiptPdf } = await import("./receipt-pdf");
                const { sendReceiptEmail } = await import("@/mail");
                const receiptDetail = await getReceiptDetail(createReceipt.num_receipt);
                if (receiptDetail) {
                    const pdfBuffer = await generateReceiptPdf(receiptDetail);
                    await sendReceiptEmail(emailToUse, {
                        num_receipt: receiptDetail.num_receipt,
                        created_at: receiptDetail.created_at,
                        total: receiptDetail.total,
                        payment_method: receiptDetail.payment_method,
                    }, pdfBuffer);
                }
            } catch (emailError) {
                console.error("Receipt email send failed:", emailError);
            }
        }

        return createReceipt;

    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error(error.message);
            console.error(error.cause);
        }

    }

}