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
    category: integer('category_id'),
    pvp: real().notNull(),
})
