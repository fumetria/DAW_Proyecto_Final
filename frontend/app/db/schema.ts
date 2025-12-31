import { relations } from "drizzle-orm";
import { uuid, pgTable, varchar, boolean, real, integer } from "drizzle-orm/pg-core";

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
});

export const categoriesTable = pgTable("categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull().unique(),
})

export const articlesTable = pgTable("articles", {
    id: uuid().defaultRandom().primaryKey(),
    cod_art: varchar({ length: 255 }).notNull().unique(),
    name: varchar({ length: 255 }).notNull(),
    category: integer('category_id').notNull().references(() => categoriesTable.id),
    pvp: real().notNull(),
})

export const articlesRelations = relations(articlesTable, ({ one }) => ({
    category: one(categoriesTable, {
        fields: [articlesTable.category],
        references: [categoriesTable.id]
    })
}))

export const numsReceiptsTable = pgTable('receipts-numbers', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    number: integer().default(0),
})

export const receiptsLineTable = pgTable("receipts-lines", {
    id: uuid().defaultRandom().primaryKey(),
    cod_art: varchar('article_cod_art').notNull().references(() => articlesTable.cod_art),
    details: varchar({ length: 255 }),
    quantity: integer().default(0).notNull(),
    price: real('article_pvp').notNull().references(() => articlesTable.pvp),
    num_receipt: varchar('num_receipt').notNull().references(() => numsReceiptsTable.number)
})

export const receiptsTable = pgTable("receipts", {
    id: uuid().defaultRandom().primaryKey(),
    num_receipt: integer().notNull(),
    total: real().notNull(),
})