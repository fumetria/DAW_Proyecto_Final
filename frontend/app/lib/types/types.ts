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
    total: number | 0;
}
export type articlesView = {
    articleID: string;
    articleCOD: string;
    articleName: string;
    articleCategory: string;
    articlePvp: number;
    articleIsActive: boolean;
}


/**
 * end-day page types
 */
export type PendingReceiptRow = {
    id: string;
    num_receipt: string;
    created_at: Date | null;
    total: number;
    payment_method: string | null;
    user_email: string;
};

export type EndDayRow = {
    id: string;
    date: string;
    total: number;
    first_receipt_id: string;
    last_receipt_id: string;
    total_receipts: number;
    created_at: Date | null;
};