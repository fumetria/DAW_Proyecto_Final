'use server'
import 'dotenv/config';
// import { drizzle } from 'drizzle-orm/neon-http';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/app/db/schema';
import { sql, or, ilike, eq, desc, DrizzleError, and, asc } from 'drizzle-orm';


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

export async function fetchFilteredCategories(
    query: string,
    currentPage?: number,
) {
    try {
        // Si no comprobamos que el query es un number, nos devolverá la función como NaN y rompe la
        // lógica de postgres y nunca salta la siguiente linea dentor de or().
        const isNumber = !isNaN(Number(query));
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
            );

        return categories;
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error('Something go wrong...', error.cause);
        }
        return [];
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

export async function fetchFilteredArticles(
    query: string,
    currentPage?: number,
) {
    //https://orm.drizzle.team/docs/joins
    //https://orm.drizzle.team/docs/select#conditional-select
    try {
        const articles = await db
            .select()
            .from(schema.articlesView)
            .where(
                or(
                    ilike(schema.articlesView.articleName, `%${query}%`),
                    ilike(schema.articlesView.articleCOD, `%${query}%`),
                    sql`${schema.articlesView.articlePvp}::text ILIKE ${`%${query}%`}`,
                    ilike(schema.articlesView.articleCategory, `%${query}%`)
                ),
            )
            .orderBy(schema.articlesView.articleCOD);

        return articles;
    } catch (error) {
        console.error(error)
    }
}

export async function fetchLastReceipt() {
    try {
        const data = await db.select().from(schema.receiptsTable).orderBy(desc(schema.receiptsTable.num_receipt)).limit(1);
        const lastReceipt = {
            num_receipt: data[0].num_receipt,
            total: data[0].total
        }
        return lastReceipt;
    } catch (error) {
        console.error(error);
        return null;
    }
}