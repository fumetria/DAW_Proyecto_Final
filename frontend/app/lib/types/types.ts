import { articlesTable, categoriesTable, numsReceiptsTable, receiptsLineTable, receiptsTable, usersTable } from "@/app/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type user = InferSelectModel<typeof usersTable>;
export type category = InferSelectModel<typeof categoriesTable>;
export type article = InferSelectModel<typeof articlesTable>;
export type numReceipt = InferSelectModel<typeof numsReceiptsTable>;
export type receiptLine = InferSelectModel<typeof receiptsLineTable>;
export type receipt = InferSelectModel<typeof receiptsTable>;
