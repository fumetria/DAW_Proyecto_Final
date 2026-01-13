import { eq, relations, sql } from "drizzle-orm";
import { uuid, pgTable, varchar, boolean, real, integer, pgView, QueryBuilder } from "drizzle-orm/pg-core";
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
    is_employee: boolean().default(false),
    is_admin: boolean().default(false),
    organization: varchar({ length: 255 }),
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
        articlePvp: articlesTable.pvp
    })
    .from(articlesTable)
    .leftJoin(categoriesTable, eq(articlesTable.category, categoriesTable.id)));

export const numsReceiptsTable = pgTable('receipts-numbers', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    serie: varchar({ length: 20 }),
    number: integer().default(0),
    ...timestamps
})

export const receiptsLineTable = pgTable("receipts-lines", {
    id: uuid().defaultRandom().primaryKey(),
    cod_art: varchar('article_cod_art').notNull().references(() => articlesTable.cod_art),
    details: varchar({ length: 255 }),
    quantity: integer().default(0).notNull(),
    price: real().notNull(),
    total: real().notNull(),
    num_receipt: varchar().notNull(),
    ...timestamps
})

export const receiptsTable = pgTable("receipts", {
    id: uuid().defaultRandom().primaryKey(),
    num_receipt: integer().notNull().unique(),
    total: real().notNull(),
    user_id: uuid('user_id').notNull().references(() => usersTable.id),
    ...timestamps
})