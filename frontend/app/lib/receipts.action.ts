'use server';

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
// import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/app/db/schema';
import { receiptLineTable } from './types/types';
import { eq, and, DrizzleError, desc, ilike, or, sql, count } from "drizzle-orm";
import { auth } from '@/auth';
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
    total: number;
};

export type ReceiptDetail = {
    id: string;
    num_receipt: string;
    created_at: Date | null;
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

        const lines = await db
            .select({
                id: schema.receiptsLineTable.id,
                cod_art: schema.receiptsLineTable.cod_art,
                article_name: schema.articlesTable.name,
                details: schema.receiptsLineTable.details,
                quantity: schema.receiptsLineTable.quantity,
                price: schema.receiptsLineTable.price,
                total: schema.receiptsLineTable.total,
            })
            .from(schema.receiptsLineTable)
            .leftJoin(schema.articlesTable, eq(schema.receiptsLineTable.cod_art, schema.articlesTable.cod_art))
            .where(eq(schema.receiptsLineTable.receipt_id, numReceipt));

        return { ...receipt, lines };
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error(error.message);
        }
        return null;
    }
}

export async function createReceipt(receiptsLineTable: receiptLineTable[], totalReceipt: number, payment_method: number) {

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

        const receiptInsert = {
            num_receipt: numReceipt,
            serie,
            year,
            number: nextNumber,
            total: totalReceipt ?? 0,
            user_email: userEmail,
            payment_method,
            is_open: true,
        };
        const [createReceipt] = await db
            .insert(schema.receiptsTable)
            .values(receiptInsert)
            .returning({
                num_receipt: schema.receiptsTable.num_receipt,
                total: schema.receiptsTable.total,
            });

        await db.insert(schema.receiptsLineTable).values(
            receiptsLineTable.map(receiptLine => ({
                cod_art: receiptLine.cod_art,
                details: receiptLine.details ?? null,
                quantity: receiptLine.quantity,
                price: receiptLine.price,
                total: receiptLine.total,
                receipt_id: createReceipt.num_receipt,
            }))
        );
        return createReceipt;

    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error(error.message);
            console.error(error.cause);
        }

    }

}