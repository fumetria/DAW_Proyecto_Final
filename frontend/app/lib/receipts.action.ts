'use server';

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/app/db/schema';
import { receiptLineTable } from './types/types';
import { eq, and } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!, { schema });

export async function createReceipt(receiptsLineTable: receiptLineTable[], totalReceipt: number, userid: string) {

    try {
        //Buscamos crear el número de ticket en formato FS26-000000
        //Las iniciales de la serie siempre será FS de Factura Simplificada
        const serie = "FS";
        //Cuando cambie el año, automáticamente actualizará la cifra del año
        const year = new Date().getFullYear() % 100;

        return db.transaction(async (tx) => {
            const [receiptCounter] = await tx.select()
                .from(schema.numsReceiptsTable)
                .for('update')
                .where(
                    and(
                        eq(schema.numsReceiptsTable.serie, serie),
                        eq(schema.numsReceiptsTable.year, year)))
                ;
            let nextNumber: number;
            if (!receiptCounter) {
                const [createReceiptCounter] = await tx.insert(schema.numsReceiptsTable)
                    .values({ serie, year, number: 1 })
                    .returning();

                nextNumber = 1;
            } else {
                nextNumber = receiptCounter.number + 1;

                await tx
                    .update(schema.numsReceiptsTable)
                    .set({ number: nextNumber })
                    .where(eq(schema.numsReceiptsTable.id, receiptCounter.id));
            }

            const numReceipt = `${serie}${year}-${String(nextNumber).padStart(6, "0")}`;

            const [createReceipt] = await tx
                .insert(schema.receiptsTable)
                .values({
                    num_receipt: numReceipt,
                    serie: serie,
                    year: year,
                    number: nextNumber,
                    total: totalReceipt,
                    user_id: userid,
                })
                .returning({ id: schema.receiptsTable.id });

            await tx.insert(schema.receiptsLineTable).values(
                receiptsLineTable.map(receiptLine => ({
                    cod_art: receiptLine.cod_art,
                    details: receiptLine.details ?? null,
                    quantity: receiptLine.quantity,
                    price: receiptLine.price,
                    total: receiptLine.total,
                    receipt_id: createReceipt.id
                }))
            );
            return numReceipt;
        },)

    } catch (error) {
        console.error(error);
    }

}