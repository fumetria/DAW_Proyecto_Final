import { eq, relations, sql } from "drizzle-orm";
import { uuid, pgTable, varchar, boolean, real, integer, pgView, QueryBuilder, uniqueIndex } from "drizzle-orm/pg-core";
import { timestamps } from "./comlumns.helpers";

const qb = new QueryBuilder();
export const usersTable = pgTable("users", {
    id: uuid().defaultRandom().primaryKey(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    dni: varchar({ length: 12 }).notNull().unique(),
    name: varchar({ length: 255 }).notNull(),
    surname1: varchar({ length: 255 }).notNull(),
    surname2: varchar({ length: 255 }),
    rol: varchar({ length: 50 }).notNull().default("user"),
    is_active: boolean().default(true),
    ...timestamps
});

export const categoriesTable = pgTable("categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull().unique(),
    ...timestamps
})

export const articlesTable = pgTable("articles", {
    id: uuid().defaultRandom().primaryKey(),
    cod_art: varchar({ length: 255 }).notNull().unique(),
    name: varchar({ length: 255 }).notNull(),
    category: integer('category_id').notNull().references(() => categoriesTable.id),
    pvp: real().notNull(),
    is_active: boolean().default(true).notNull(),
    ...timestamps
})

export const articlesRelations = relations(articlesTable, ({ one }) => ({
    category: one(categoriesTable, {
        fields: [articlesTable.category],
        references: [categoriesTable.id]
    })
}))

export const articlesView = pgView("article_view").as(qb
    .select({
        articleID: articlesTable.id,
        articleCOD: articlesTable.cod_art,
        articleName: sql<string>`${articlesTable.name}`.as('article_name'),
        articleCategory: sql<string>`${categoriesTable.name}`.as('category_name'),
        articlePvp: articlesTable.pvp,
        articleIsActive: articlesTable.is_active
    })
    .from(articlesTable)
    .leftJoin(categoriesTable, eq(articlesTable.category, categoriesTable.id)));

export const numsReceiptsTable = pgTable("receipts-numbers", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    serie: varchar({ length: 20 }).notNull().default("FS"),
    year: integer()
        .notNull()
        .default(sql`EXTRACT(YEAR FROM CURRENT_DATE)::int % 100`),
    number: integer().notNull().default(0),
    ...timestamps,

}, (t) => ({
    uniqSerieYear: uniqueIndex("uniq_receipt_serie_year")
        .on(t.serie, t.year),
})
);

export const receiptsLineTable = pgTable("receipts-lines", {
    id: uuid().defaultRandom().primaryKey(),
    cod_art: varchar('article_cod_art').notNull().references(() => articlesTable.cod_art),
    details: varchar({ length: 255 }),
    quantity: integer().default(0).notNull(),
    price: real().notNull(),
    total: real().notNull(),
    receipt_id: varchar()
        .notNull()
        .references(() => receiptsTable.num_receipt, { onDelete: "cascade" }),
    ...timestamps
});

export const receiptsTable = pgTable("receipts", {
    id: uuid().defaultRandom().primaryKey(),
    num_receipt: varchar().notNull().unique(),
    serie: varchar({ length: 20 }).notNull(),
    year: integer().notNull(),
    number: integer().notNull(),
    total: real().default(0).notNull(),
    user_email: varchar('user_email').notNull().references(() => usersTable.email),
    payment_method: integer().notNull().references(() => paymentMethodsTable.id),
    is_open: boolean().default(true).notNull(),
    end_day_id: uuid('end_day_id'),
    ...timestamps
});

export const paymentMethodsTable = pgTable("payment-methods", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull().unique(),
    ...timestamps,
});

export const receiptRelations = relations(receiptsTable, ({ one }) => ({
    payment_method: one(paymentMethodsTable, {
        fields: [receiptsTable.payment_method],
        references: [paymentMethodsTable.id]
    })
}));

export const receiptView = pgView("receipt_view").as(qb
    .select({
        id: receiptsTable.id,
        num_receipt: receiptsTable.num_receipt,
        created_at: receiptsTable.created_at,
        total: receiptsTable.total,
        payment_method: sql<string>`${paymentMethodsTable.name}`.as('payment_method_name'),
        user_email: receiptsTable.user_email,
        is_open: receiptsTable.is_open,
    })
    .from(receiptsTable)
    .leftJoin(paymentMethodsTable, eq(receiptsTable.payment_method, paymentMethodsTable.id))
)

export const receiptLinesRelations = relations(receiptsLineTable, ({ one }) => ({
    receipt_id: one(receiptsTable, {
        fields: [receiptsLineTable.receipt_id],
        references: [receiptsTable.id]
    })
}));

export const endDaysTable = pgTable("end-days", {
    id: uuid().defaultRandom().primaryKey(),
    date: varchar().notNull(),
    total: real().notNull(),
    first_receipt_id: varchar().notNull().references(() => receiptsTable.num_receipt),
    last_receipt_id: varchar().notNull().references(() => receiptsTable.num_receipt),
    total_receipts: integer().notNull(),
    user_email: varchar('user_email').notNull().references(() => usersTable.email),
    ...timestamps,
})