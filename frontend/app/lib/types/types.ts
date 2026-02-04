import { articlesTable, categoriesTable, numsReceiptsTable, receiptsLineTable, receiptsTable, usersTable } from "@/app/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type user = InferSelectModel<typeof usersTable>;
export type category = InferSelectModel<typeof categoriesTable>;
export type article = InferSelectModel<typeof articlesTable>;
export type numReceipt = InferSelectModel<typeof numsReceiptsTable>;
export type receiptLine = InferSelectModel<typeof receiptsLineTable>;
export type receipt = InferSelectModel<typeof receiptsTable>;
export type receiptLineTable = {
    cod_art: string;
    name: string;
    details?: string | null;
    quantity: number;
    price: number;
    total: number;
}
export type lastReceipt = {
    num_receipt: string;
    total: number;
}
