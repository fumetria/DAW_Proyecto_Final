'use server';

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
// import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/app/db/schema';
import { eq, and, DrizzleError, desc, asc, gte, lte, count } from 'drizzle-orm';

const ITEMS_PER_PAGE = 10;
import { revalidatePath } from 'next/cache';
import { PendingReceiptRow, EndDayRow } from './types/types';

const db = drizzle(process.env.DATABASE_URL!, { schema });


const pendingReceiptSelect = {
    id: schema.receiptsTable.id,
    num_receipt: schema.receiptsTable.num_receipt,
    created_at: schema.receiptsTable.created_at,
    total: schema.receiptsTable.total,
    payment_method: schema.receiptsTable.payment_method,
    user_email: schema.receiptsTable.user_email,
};

export async function getPendingReceipts(
    page: number = 1,
): Promise<{ receipts: PendingReceiptRow[]; totalCount: number }> {
    try {
        const whereOpen = eq(schema.receiptsTable.is_open, true);
        const [countResult] = await db
            .select({ count: count() })
            .from(schema.receiptsTable)
            .where(whereOpen);
        const totalCount = Number(countResult?.count ?? 0);
        const receipts = await db
            .select(pendingReceiptSelect)
            .from(schema.receiptsTable)
            .where(whereOpen)
            .orderBy(asc(schema.receiptsTable.created_at))
            .limit(ITEMS_PER_PAGE)
            .offset((page - 1) * ITEMS_PER_PAGE);
        return { receipts, totalCount };
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error(error.message);
        }
        return { receipts: [], totalCount: 0 };
    }
}

export async function createEndDay(): Promise<{ ok: boolean; error?: string }> {
    try {
        const pending = await db
            .select({
                id: schema.receiptsTable.id,
                num_receipt: schema.receiptsTable.num_receipt,
                total: schema.receiptsTable.total,
                created_at: schema.receiptsTable.created_at,
            })
            .from(schema.receiptsTable)
            .where(eq(schema.receiptsTable.is_open, true))
            .orderBy(asc(schema.receiptsTable.created_at));

        if (pending.length === 0) {
            return { ok: false, error: 'No hay tickets pendientes de cierre.' };
        }

        const total = pending.reduce((sum, r) => sum + (r.total ?? 0), 0);
        const first = pending[0];
        const last = pending[pending.length - 1];
        const dateStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

        await db.insert(schema.endDaysTable).values({
            date: dateStr,
            total,
            first_receipt_id: first.num_receipt,
            last_receipt_id: last.num_receipt,
            total_receipts: pending.length,
        });

        for (const r of pending) {
            await db
                .update(schema.receiptsTable)
                .set({ is_open: false })
                .where(eq(schema.receiptsTable.id, r.id));
        }

        revalidatePath('/dashboard/end-day');
        return { ok: true };
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error(error.message);
            return { ok: false, error: error.message };
        }
        return { ok: false, error: 'Error al cerrar caja.' };
    }
}

const endDaySelect = {
    id: schema.endDaysTable.id,
    date: schema.endDaysTable.date,
    total: schema.endDaysTable.total,
    first_receipt_id: schema.endDaysTable.first_receipt_id,
    last_receipt_id: schema.endDaysTable.last_receipt_id,
    total_receipts: schema.endDaysTable.total_receipts,
    created_at: schema.endDaysTable.created_at,
};

export async function getEndDays(
    dateFrom?: string,
    dateTo?: string,
    page: number = 1,
): Promise<{ endDays: EndDayRow[]; totalCount: number }> {
    try {
        const conditions: ReturnType<typeof gte>[] = [];
        if (dateFrom?.trim()) {
            conditions.push(gte(schema.endDaysTable.date, dateFrom.trim()));
        }
        if (dateTo?.trim()) {
            conditions.push(lte(schema.endDaysTable.date, dateTo.trim()));
        }
        const whereClause =
            conditions.length > 1 ? and(...conditions) : conditions.length === 1 ? conditions[0] : undefined;

        const [countResult] = whereClause
            ? await db.select({ count: count() }).from(schema.endDaysTable).where(whereClause)
            : await db.select({ count: count() }).from(schema.endDaysTable);
        const totalCount = Number(countResult?.count ?? 0);

        const order = [desc(schema.endDaysTable.date), desc(schema.endDaysTable.created_at)];
        const offset = (page - 1) * ITEMS_PER_PAGE;
        const rows = whereClause
            ? await db
                .select(endDaySelect)
                .from(schema.endDaysTable)
                .where(whereClause)
                .orderBy(...order)
                .limit(ITEMS_PER_PAGE)
                .offset(offset)
            : await db
                .select(endDaySelect)
                .from(schema.endDaysTable)
                .orderBy(...order)
                .limit(ITEMS_PER_PAGE)
                .offset(offset);
        return { endDays: rows, totalCount };
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error(error.message);
        }
        return { endDays: [], totalCount: 0 };
    }
}
