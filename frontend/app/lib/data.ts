import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/app/db/schema';

const db = drizzle(process.env.DATABASE_URL!, { schema });

export async function fetchArticlesCategories() {
    try {
        const categories = await db.select().from(schema.categoriesTable);
        return categories;
    } catch (error) {
        console.error('Something go wrong...', error);
    }
}

export async function fetchArticles() {
    try {
        const articles = await db.select().from(schema.articlesTable);
        return articles;
    } catch (error) {
        console.error('Something go wrong...', error);
    }
}