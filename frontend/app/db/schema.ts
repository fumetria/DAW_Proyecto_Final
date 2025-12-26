import { uuid, pgTable, varchar, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid().defaultRandom().primaryKey(),
    dni: varchar({ length: 12 }).notNull().unique(),
    name: varchar({ length: 255 }).notNull(),
    surname1: varchar({ length: 255 }).notNull(),
    surname2: varchar({ length: 255 }),
    is_employee: boolean().default(false),
    is_admin: boolean().default(false),
    organization: varchar({ length: 255 }),
    is_active: boolean().default(true),
});