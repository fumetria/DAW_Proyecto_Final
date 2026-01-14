'use server'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/app/db/schema';
import { sql, or, ilike } from 'drizzle-orm';


const db = drizzle(process.env.DATABASE_URL!, { schema });

export async function fetchArticlesCategories() {
    try {
        const result = await db.select().from(schema.categoriesTable);
        return result;
    } catch (error) {
        console.error('Something go wrong...', error);
    }
}

export async function fetchCategoryById(id: string) {
    try {
        const category = await db.select().from(schema.categoriesTable).where(sql`${schema.categoriesTable.id} = ${id}`);
        return category;
    } catch (error) {
        console.error(error);
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
        console.error('Something go wrong...', error);
    }
}

export async function fetchArticlesByCategory(category: string) {
    try {
        const categoryFetch = await db.select().from(schema.categoriesTable).where(sql`${schema.categoriesTable.name} = ${category}`);
        if (!categoryFetch.length) return [];
        const articles = await db.select().from(schema.articlesTable).where(sql`${schema.articlesTable.category} = ${categoryFetch[0].id}`);
        return articles;
    } catch (error) {
        console.error('Something go wrong...', error);
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
            );

        return articles;
    } catch (error) {
        console.error(error)
    }
}