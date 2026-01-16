'use server';
import { z } from 'zod';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/app/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const db = drizzle(process.env.DATABASE_URL!, { schema });

const ArticleFormSchema = z.object({
    cod_art: z.string(),
    name: z.string(),
    pvp: z.coerce.number(),
    category: z.coerce.number()
});

const CreateArticle = ArticleFormSchema;

export async function createArticle(formData: FormData) {

    const { cod_art, name, pvp, category } = CreateArticle.parse({
        cod_art: formData.get('cod_art'),
        name: formData.get('name'),
        pvp: formData.get('pvp'),
        category: formData.get('category'),
    });
    //It's usually good practice to store monetary values in cents in your database 
    //to eliminate JavaScript floating-point errors and ensure greater accuracy.

    const newArticle: typeof schema.articlesTable.$inferInsert = {
        cod_art: cod_art,
        name: name,
        pvp: pvp,
        category: category,
    }

    await db.insert(schema.articlesTable).values(newArticle);
    revalidatePath('/dashboard/maintance/articles');
    redirect('/dashboard/maintance/articles');
}
