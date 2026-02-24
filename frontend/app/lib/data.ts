'use server'
import 'dotenv/config';
// import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@/app/db/schema';
import { sql, or, ilike, eq, desc, DrizzleError, and, asc, count } from 'drizzle-orm';
import type { UserRow, DashboardPieChartData } from '@/app/lib/types/types';
import { getDb } from "./actions";



const ITEMS_PER_PAGE = 5;

export async function fetchArticlesCategories() {
    try {
        const db = await getDb();
        const result = await db.select().from(schema.categoriesTable);
        return result;
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error('Something go wrong...', error.cause);
        }
        return [];
    }
}

export async function fetchFilteredCategories(
    query: string,
    currentPage: number = 1,
): Promise<{ categories: typeof schema.categoriesTable.$inferSelect[]; totalCount: number }> {
    try {
        const db = await getDb();
        const isNumber = !isNaN(Number(query));
        const [countResult] = await db
            .select({ count: count() })
            .from(schema.categoriesTable)
            .where(or(
                // Por tanto hacemos una comparación ternaria, si no es number nos devuelve undefined
                // y pasa a la siguiente linea
                isNumber
                    ? eq(schema.categoriesTable.id, Number(query))
                    : undefined,
                ilike(schema.categoriesTable.name, `%${query}%`),
            ),);
        const totalCount = Number(countResult?.count ?? 0);

        // Si no comprobamos que el query es un number, nos devolverá la función como NaN y rompe la
        // lógica de postgres y nunca salta la siguiente linea dentor de or().
        const categories = await db
            .select()
            .from(schema.categoriesTable)
            .where(
                or(
                    // Por tanto hacemos una comparación ternaria, si no es number nos devuelve undefined
                    // y pasa a la siguiente linea
                    isNumber
                        ? eq(schema.categoriesTable.id, Number(query))
                        : undefined,
                    ilike(schema.categoriesTable.name, `%${query}%`),
                ),
            )
            .limit(ITEMS_PER_PAGE)
            .offset((currentPage - 1) * ITEMS_PER_PAGE);

        return { categories, totalCount };
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error('Something go wrong...', error.cause);
        }
        return { categories: [], totalCount: 0 };
    }
}

export async function fetchCategoryById(id: string) {
    try {
        const db = await getDb();
        const category = await db.select().from(schema.categoriesTable).where(sql`${schema.categoriesTable.id} = ${id}`);
        return category;
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error('Something go wrong...', error.cause);
        }
    }
}

// export async function fetchArticles() {
//     try {
//         // const articles = await db.select().from(schema.articlesTable);
//         const articles = await db.query.articlesTable.findMany({
//             with: {
//                 category: true,
//             }
//         });
//         return articles;
//     } catch (error) {
//         if (error instanceof DrizzleError) {
//             console.error('Something go wrong...', error.cause);
//         }
//     }
// }

export async function fetchArticlesByCategory(category: string) {
    try {
        const db = await getDb();
        const categoryFetch = await db.select().from(schema.categoriesTable).where(sql`${schema.categoriesTable.name} = ${category}`);
        if (!categoryFetch.length) return [];
        const articles = await db
            .select()
            .from(schema.articlesTable)
            .where(
                and(
                    eq(schema.articlesTable.category, categoryFetch[0].id),
                    eq(schema.articlesTable.is_active, true)
                )
            )
            .orderBy(asc(schema.articlesTable.cod_art))
            ;
        return articles;
    } catch (error) {
        console.error('Something go wrong...', error);
        return [];
    }
}



export async function fetchArticleById(id: string) {
    try {
        const db = await getDb();
        const filteredArticle = await db
            .select().from(schema.articlesTable).where(eq(schema.articlesTable.id, id));
        return filteredArticle[0];
    } catch (error) {
        console.error(error);
    }
}

const articlesWhere = (query: string) =>
    or(
        ilike(schema.articlesView.articleName, `%${query}%`),
        ilike(schema.articlesView.articleCOD, `%${query}%`),
        sql`${schema.articlesView.articlePvp}::text ILIKE ${`%${query}%`}`,
        ilike(schema.articlesView.articleCategory, `%${query}%`),
    );

export async function fetchFilteredArticles(
    query: string,
    currentPage: number = 1,
): Promise<{ articles: typeof schema.articlesView.$inferSelect[]; totalCount: number }> {
    try {
        const db = await getDb();
        const whereClause = articlesWhere(query);
        const [countResult] = await db
            .select({ count: count() })
            .from(schema.articlesView)
            .where(whereClause);
        const totalCount = Number(countResult?.count ?? 0);

        const articles = await db
            .select()
            .from(schema.articlesView)
            .where(whereClause)
            .orderBy(schema.articlesView.articleCOD)
            .limit(ITEMS_PER_PAGE)
            .offset((currentPage - 1) * ITEMS_PER_PAGE);

        return { articles, totalCount };
    } catch (error) {
        console.error(error);
        return { articles: [], totalCount: 0 };
    }
}
export async function fetchLastReceipt() {
    try {
        const db = await getDb();
        const data = await db.select().from(schema.receiptsTable).orderBy(desc(schema.receiptsTable.num_receipt)).limit(1);
        const first = data[0];
        if (!first) {
            return null;
        }
        return {
            num_receipt: first.num_receipt,
            total: first.total
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function fetchDashboardStats() {
    try {
        const db = await getDb();
        const year = new Date().getFullYear().toString().substring(2, 4);
        // Get total receipts count for current year
        const receiptsCount = await db
            .select({ count: sql<number>`cast(count(${schema.receiptsTable.id}) as int)` })
            .from(schema.receiptsTable)
            .where(eq(schema.receiptsTable.year, Number(year)));
        // Get total revenue for current year
        const revenueSum = await db
            .select({ total: sql<number>`cast(sum(${schema.receiptsTable.total}) as float)` })
            .from(schema.receiptsTable)
            .where(eq(schema.receiptsTable.year, Number(year)));

        const incomeThisMonth = await db
            .select({ total: sql<number>`cast(sum(${schema.receiptsTable.total}) as float)` })
            .from(schema.receiptsTable)
            .where(and(
                eq(schema.receiptsTable.year, Number(year)),
                eq(sql`EXTRACT(MONTH FROM ${schema.receiptsTable.created_at}::date)`, new Date().getMonth() + 1)
            ))

        const incomeToday = await db
            .select({ total: sql<number>`cast(sum(${schema.receiptsTable.total}) as float)` })
            .from(schema.receiptsTable)
            .where(and(
                eq(schema.receiptsTable.year, Number(year)),
                eq(sql`EXTRACT(DAY FROM ${schema.receiptsTable.created_at}::date)`, new Date().getDate())
            ))
        return {
            totalTickets: Number(receiptsCount[0]?.count ?? 0),
            totalRevenue: Number(revenueSum[0]?.total ?? 0),
            incomeThisMonth: Number(incomeThisMonth[0]?.total ?? 0),
            incomeToday: Number(incomeToday[0]?.total ?? 0)
        };
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return { totalTickets: 0, totalRevenue: 0 };
    }
}

export async function fetchRecentReceipts() {
    try {
        const db = await getDb();
        const recentReceipts = await db
            .select()
            .from(schema.receiptView)
            .orderBy(desc(schema.receiptView.created_at))
            .limit(5);

        return recentReceipts;
    } catch (error) {
        console.error('Error fetching recent receipts:', error);
        return [];
    }
}

export async function fetchTicketsByPaymentMethod(): Promise<DashboardPieChartData[]> {
    try {
        const db = await getDb();
        const year = new Date().getFullYear().toString().substring(2, 4);
        const rows = await db
            .select({
                name: schema.paymentMethodsTable.name,
                value: sql<number>`cast(count(${schema.receiptsTable.id}) as int)`,
            })
            .from(schema.receiptsTable)
            .leftJoin(schema.paymentMethodsTable, eq(schema.receiptsTable.payment_method, schema.paymentMethodsTable.id))
            .where(eq(schema.receiptsTable.year, Number(year)))
            .groupBy(schema.paymentMethodsTable.id, schema.paymentMethodsTable.name);

        return rows.map((r) => ({ name: r.name ?? "Sin método", value: Number(r.value) }));
    } catch (error) {
        console.error("Error fetching tickets by payment method:", error);
        return [];
    }
}

export async function fetchTicketsByUser(): Promise<DashboardPieChartData[]> {
    try {
        const db = await getDb();
        const year = new Date().getFullYear().toString().substring(2, 4);
        const rows = await db
            .select({
                userName: schema.usersTable.name,
                surname1: schema.usersTable.surname1,
                surname2: schema.usersTable.surname2,
                value: sql<number>`cast(count(${schema.receiptsTable.id}) as int)`,
            })
            .from(schema.receiptsTable)
            .innerJoin(schema.usersTable, eq(schema.receiptsTable.user_email, schema.usersTable.email))
            .where(eq(schema.receiptsTable.year, Number(year)))
            .groupBy(schema.usersTable.id, schema.usersTable.name, schema.usersTable.surname1, schema.usersTable.surname2);

        return rows.map((r) => {
            const fullName = [r.userName, r.surname1, r.surname2].filter(Boolean).join(" ");
            return { name: fullName, value: Number(r.value) };
        });
    } catch (error) {
        console.error("Error fetching tickets by user:", error);
        return [];
    }
}

export async function fetchMonthlyRevenue() {
    try {
        const db = await getDb();
        const year = new Date().getFullYear();

        // This query groups by month and sums the total
        // We cast the date string (YYYY-MM-DD) to date to extract month
        const monthlyRevenue = await db
            .select({
                month: sql<number>`EXTRACT(MONTH FROM ${schema.receiptsTable.created_at}::date)`,
                revenue: sql<number>`SUM(${schema.receiptsTable.total})`
            })
            .from(schema.receiptsTable)
            .where(sql`EXTRACT(YEAR FROM ${schema.receiptsTable.created_at}::date) = ${year}`)
            .groupBy(sql`EXTRACT(MONTH FROM ${schema.receiptsTable.created_at}::date)`)
            .orderBy(sql`EXTRACT(MONTH FROM ${schema.receiptsTable.created_at}::date)`);

        return monthlyRevenue;
    } catch (error) {
        console.error('Error fetching monthly revenue:', error);
        return [];
    }
}

export async function fetchPaymentMethods() {
    try {
        const db = await getDb();
        const paymentMethods = await db.select().from(schema.paymentMethodsTable);
        return paymentMethods;
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error('Error fetching payment methods:', error.message);
        }
        return [];
    }
}

const usersWhere = (query: string) =>
    or(
        ilike(schema.usersTable.email, `%${query}%`),
        ilike(schema.usersTable.name, `%${query}%`),
        ilike(schema.usersTable.surname1, `%${query}%`),
        ilike(schema.usersTable.dni, `%${query}%`),
        ilike(schema.usersTable.rol, `%${query}%`),
    );

export async function fetchFilteredUsers(
    query: string,
    currentPage: number = 1,
): Promise<{ users: UserRow[]; totalCount: number }> {
    try {
        const db = await getDb();
        const whereClause = usersWhere(query);
        const [countResult] = await db
            .select({ count: count() })
            .from(schema.usersTable)
            .where(whereClause);
        const totalCount = Number(countResult?.count ?? 0);

        const rows = await db
            .select({
                id: schema.usersTable.id,
                email: schema.usersTable.email,
                name: schema.usersTable.name,
                surname1: schema.usersTable.surname1,
                surname2: schema.usersTable.surname2,
                rol: schema.usersTable.rol,
                is_active: schema.usersTable.is_active,
            })
            .from(schema.usersTable)
            .where(whereClause)
            .orderBy(schema.usersTable.email)
            .limit(ITEMS_PER_PAGE)
            .offset((currentPage - 1) * ITEMS_PER_PAGE);

        const users: UserRow[] = rows.map((r) => ({
            id: r.id,
            email: r.email,
            name: r.name,
            surname1: r.surname1,
            surname2: r.surname2,
            rol: r.rol,
            is_active: r.is_active,
        }));

        return { users, totalCount };
    } catch (error) {
        console.error(error);
        return { users: [], totalCount: 0 };
    }
}

export async function fetchUserById(id: string) {
    try {
        const db = await getDb();
        const [user] = await db
            .select()
            .from(schema.usersTable)
            .where(eq(schema.usersTable.id, id));
        return user ?? null;
    } catch (error) {
        console.error(error);
        return null;
    }
}