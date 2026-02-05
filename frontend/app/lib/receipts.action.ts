'use server';

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
// import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/app/db/schema';
import { receiptLineTable } from './types/types';
import { eq, and, DrizzleError } from "drizzle-orm";
import { auth } from '@/auth';
const db = drizzle(process.env.DATABASE_URL!, { schema });

export async function createReceipt(receiptsLineTable: receiptLineTable[], totalReceipt: number) {

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
            const [createReceiptCounter] = await db.insert(schema.numsReceiptsTable)
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
            payment_method: null, // explícito
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