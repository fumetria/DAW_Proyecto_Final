'use server';

import 'dotenv/config';
// import { drizzle } from 'drizzle-orm/neon-http';
// import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/app/db/schema';
import { eq, and, DrizzleError, desc, asc, gte, lte } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { PendingReceiptRow, EndDayRow, EndDayDetail } from './types/types';
import { auth } from '@/auth';
import { getUserRole } from './login.action';
import { getDb } from "./actions";

// const db = drizzle(process.env.DATABASE_URL!, { schema });


export async function getPendingReceipts(): Promise<PendingReceiptRow[]> {
    try {
        const db = await getDb();
        const session = await auth();
        const userEmail = session?.user?.email;
        if (!userEmail) return [];
        const receipts = await db
            .select({
                id: schema.receiptView.id,
                num_receipt: schema.receiptView.num_receipt,
                created_at: schema.receiptView.created_at,
                total: schema.receiptView.total,
                payment_method: schema.receiptView.payment_method,
                user_email: schema.receiptView.user_email,
            })
            .from(schema.receiptView)
            .where(
                and(
                    eq(schema.receiptView.is_open, true),
                    eq(schema.receiptView.user_email, userEmail),
                ),
            )
            .orderBy(asc(schema.receiptView.created_at));
        return receipts;
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error(error.message);
        }
        return [];
    }
}

export async function getAllPendingReceipts(): Promise<PendingReceiptRow[]> {
    try {
        const db = await getDb();
        const role = await getUserRole();
        if (role !== "admin") throw new Error("Acción no permitida.");

        const receipts = await db
            .select({
                id: schema.receiptView.id,
                num_receipt: schema.receiptView.num_receipt,
                created_at: schema.receiptView.created_at,
                total: schema.receiptView.total,
                payment_method: schema.receiptView.payment_method,
                user_email: schema.receiptView.user_email,
            })
            .from(schema.receiptView)
            .where(
                eq(schema.receiptView.is_open, true),
            )
            .orderBy(asc(schema.receiptView.created_at));
        return receipts;
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error(error.message);
        }
        return [];
    }
}

/**
 * Cierra caja con los tickets pendientes.
 * @param closeAll - Si true (solo Admin): cierra todos los tickets pendientes. Si false: solo los del usuario actual.
 */
export async function createEndDay(closeAll: boolean = false): Promise<{ ok: boolean; error?: string }> {
    try {
        const db = await getDb();
        const session = await auth();
        const userEmail = session?.user?.email;

        const baseConditions = closeAll
            ? eq(schema.receiptsTable.is_open, true)
            : and(
                eq(schema.receiptsTable.is_open, true),
                eq(schema.receiptsTable.user_email, userEmail ?? ''),
            );

        if (!closeAll && !userEmail) {
            return { ok: false, error: 'Debes iniciar sesión para cerrar caja.' };
        }

        if (closeAll) {
            const role = await getUserRole();
            if (role !== 'admin') {
                return { ok: false, error: 'Solo un administrador puede cerrar caja con todos los tickets.' };
            }
        }

        const pending = await db
            .select({
                id: schema.receiptsTable.id,
                num_receipt: schema.receiptsTable.num_receipt,
                total: schema.receiptsTable.total,
                created_at: schema.receiptsTable.created_at,
            })
            .from(schema.receiptsTable)
            .where(baseConditions)
            .orderBy(asc(schema.receiptsTable.created_at));

        if (pending.length === 0) {
            return { ok: false, error: 'No hay tickets pendientes de cierre.' };
        }

        if (!userEmail) {
            return { ok: false, error: 'Debes iniciar sesión para cerrar caja.' };
        }

        const total = pending.reduce((sum, r) => sum + (r.total ?? 0), 0);
        const first = pending[0];
        const last = pending[pending.length - 1];
        const dateStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

        const [inserted] = await db.insert(schema.endDaysTable).values({
            date: dateStr,
            total,
            first_receipt_id: first.num_receipt,
            last_receipt_id: last.num_receipt,
            total_receipts: pending.length,
            user_email: userEmail,
        }).returning();

        const endDayId = inserted?.id;
        if (!endDayId) {
            return { ok: false, error: 'Error al crear el registro de cierre.' };
        }

        for (const r of pending) {
            await db
                .update(schema.receiptsTable)
                .set({ is_open: false, end_day_id: endDayId })
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

export async function getEndDays(dateFrom?: string, dateTo?: string): Promise<EndDayRow[]> {
    try {
        const db = await getDb();
        const q = db
            .select({
                id: schema.endDaysTable.id,
                date: schema.endDaysTable.date,
                total: schema.endDaysTable.total,
                first_receipt_id: schema.endDaysTable.first_receipt_id,
                last_receipt_id: schema.endDaysTable.last_receipt_id,
                total_receipts: schema.endDaysTable.total_receipts,
                created_at: schema.endDaysTable.created_at,
                user_email: schema.endDaysTable.user_email,
            })
            .from(schema.endDaysTable)
            .orderBy(desc(schema.endDaysTable.date), desc(schema.endDaysTable.created_at));

        if (dateFrom?.trim() || dateTo?.trim()) {
            const conditions: ReturnType<typeof gte>[] = [];
            if (dateFrom?.trim()) {
                conditions.push(gte(schema.endDaysTable.date, dateFrom.trim()));
            }
            if (dateTo?.trim()) {
                conditions.push(lte(schema.endDaysTable.date, dateTo.trim()));
            }
            if (conditions.length > 0) {
                const rows = await db
                    .select({
                        id: schema.endDaysTable.id,
                        date: schema.endDaysTable.date,
                        total: schema.endDaysTable.total,
                        first_receipt_id: schema.endDaysTable.first_receipt_id,
                        last_receipt_id: schema.endDaysTable.last_receipt_id,
                        total_receipts: schema.endDaysTable.total_receipts,
                        created_at: schema.endDaysTable.created_at,
                        user_email: schema.endDaysTable.user_email,
                    })
                    .from(schema.endDaysTable)
                    .where(conditions.length > 1 ? and(...conditions) : conditions[0])
                    .orderBy(desc(schema.endDaysTable.date), desc(schema.endDaysTable.created_at));
                return rows;
            }
        }

        const rows = await q;
        return rows;
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error(error.message);
        }
        return [];
    }
}

export async function getEndDayDetail(endDayId: string): Promise<EndDayDetail | null> {
    try {
        const db = await getDb();
        const [endDay] = await db
            .select({
                date: schema.endDaysTable.date,
                user_email: schema.endDaysTable.user_email,
                total: schema.endDaysTable.total,
            })
            .from(schema.endDaysTable)
            .where(eq(schema.endDaysTable.id, endDayId));

        if (!endDay) return null;

        const receipts = await db
            .select({
                num_receipt: schema.receiptsTable.num_receipt,
                created_at: schema.receiptsTable.created_at,
                total: schema.receiptsTable.total,
            })
            .from(schema.receiptsTable)
            .where(eq(schema.receiptsTable.end_day_id, endDayId))
            .orderBy(asc(schema.receiptsTable.created_at));

        return {
            date: endDay.date,
            user_email: endDay.user_email,
            total: endDay.total,
            receipts,
        };
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error(error.message);
        }
        return null;
    }
}
