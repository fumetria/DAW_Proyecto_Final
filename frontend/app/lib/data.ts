'use server'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
// import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/app/db/schema';
import { sql, or, ilike, eq, desc, DrizzleError, and, asc, count } from 'drizzle-orm';
import type { UserRow } from '@/app/lib/types/dashboard-tables';

const ITEMS_PER_PAGE = 10;


const db = drizzle(process.env.DATABASE_URL!, { schema });

export async function fetchArticlesCategories() {
    try {
        const result = await db.select().from(schema.categoriesTable);
        return result;
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error('Something go wrong...', error.cause);
        }
        return [];
    }
}

const categoriesWhere = (query: string) => {
    const isNumber = !isNaN(Number(query));
    return or(
        isNumber ? eq(schema.categoriesTable.id, Number(query)) : undefined,
        ilike(schema.categoriesTable.name, `%${query}%`),
    );
};

export async function fetchFilteredCategories(
    query: string,
    currentPage: number = 1,
): Promise<{ categories: typeof schema.categoriesTable.$inferSelect[]; totalCount: number }> {
    try {
        const whereClause = categoriesWhere(query);
        const [countResult] = await db
            .select({ count: count() })
            .from(schema.categoriesTable)
            .where(whereClause);
        const totalCount = Number(countResult?.count ?? 0);

        const categories = await db
            .select()
            .from(schema.categoriesTable)
            .where(whereClause)
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
        const category = await db.select().from(schema.categoriesTable).where(sql`${schema.categoriesTable.id} = ${id}`);
        return category;
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error('Something go wrong...', error.cause);
        }
    }
}

export async function fetchArticles() {
    try {
        // const articles = await db.select().from(schema.articlesTable);
        const articles = await db.query.articlesTable.findMany({
            with: {
                category: true,
            }
        });
        return articles;
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error('Something go wrong...', error.cause);
        }
    }
}

export async function fetchArticlesByCategory(category: string) {
    try {
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
        const filteredArticle = await db
            .select().from(schema.articlesTable).where(eq(schema.articlesTable.id, id));
        return filteredArticle[0];
    } catch (error) {
        console.error(error);
    }
}

export async function fetchLastReceipt() {
    try {
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

export async function fetchFilteredUsers(
    currentPage: number = 1,
): Promise<{ users: UserRow[]; totalCount: number }> {
    try {
        const [countResult] = await db
            .select({ count: count() })
            .from(schema.usersTable);
        const totalCount = Number(countResult?.count ?? 0);

        const users = await db
            .select({
                id: schema.usersTable.id,
                email: schema.usersTable.email,
                name: schema.usersTable.name,
                surname1: schema.usersTable.surname1,
                surname2: schema.usersTable.surname2,
                is_employee: schema.usersTable.is_employee,
                is_admin: schema.usersTable.is_admin,
                is_active: schema.usersTable.is_active,
            })
            .from(schema.usersTable)
            .limit(ITEMS_PER_PAGE)
            .offset((currentPage - 1) * ITEMS_PER_PAGE);

        return { users, totalCount };
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error('Error fetching users:', error.cause);
        }
        return { users: [], totalCount: 0 };
    }
}

export async function fetchDashboardStats() {
    try {
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
        return {
            totalTickets: Number(receiptsCount[0]?.count ?? 0),
            totalRevenue: Number(revenueSum[0]?.total ?? 0)
        };
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return { totalTickets: 0, totalRevenue: 0 };
    }
}

export async function fetchRecentReceipts() {
    try {
        const recentReceipts = await db
            .select()
            .from(schema.receiptsTable)
            .orderBy(desc(schema.receiptsTable.created_at))
            .limit(5);

        return recentReceipts;
    } catch (error) {
        console.error('Error fetching recent receipts:', error);
        return [];
    }
}

export async function fetchMonthlyRevenue() {
    try {
        const year = new Date().getFullYear();

        // This query groups by month and sums the total
        // We cast the date string (YYYY-MM-DD) to date to extract month
        const monthlyRevenue = await db
            .select({
                month: sql<number>`EXTRACT(MONTH FROM ${schema.endDaysTable.date}::date)`,
                revenue: sql<number>`SUM(${schema.endDaysTable.total})`
            })
            .from(schema.endDaysTable)
            .where(sql`EXTRACT(YEAR FROM ${schema.endDaysTable.date}::date) = ${year}`)
            .groupBy(sql`EXTRACT(MONTH FROM ${schema.endDaysTable.date}::date)`)
            .orderBy(sql`EXTRACT(MONTH FROM ${schema.endDaysTable.date}::date)`);

        return monthlyRevenue;
    } catch (error) {
        console.error('Error fetching monthly revenue:', error);
        return [];
    }
}