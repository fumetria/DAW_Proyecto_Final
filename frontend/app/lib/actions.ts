'use server';
import { z } from 'zod';
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/app/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const db = drizzle(process.env.DATABASE_URL!, { schema });

const ArticleFormSchema = z.object({
    id: z.string(),
    cod_art: z.string({
        invalid_type_error: 'Por favor, introduce un código de artículo',
    }).min(1, 'Por favor, introduce un código de artículo'),
    name: z.string({
        invalid_type_error: 'Por favor, introduce un nombre válido'
    }).min(1, 'El nombre es obligatorio').regex(/^[^#@~&]*$/, {
        message: 'El nombre introducido contiene carácteres inválidos',
    }),
    pvp: z.coerce.number({
        invalid_type_error: 'El dato introducido no es un número'
    }).gt(0, {
        message: 'El precio no puede ser menor de 0',
    }),
    category: z.coerce.number().gt(0, 'Selecciona una categoría')
});

const CreateArticle = ArticleFormSchema.omit({ id: true });

export type State = {
    errors?: {
        cod_art?: string[];
        name?: string[];
        pvp?: string[];
        category?: string[];
    };
    message?: string | null;
}

export async function createArticle(prevState: State, formData: FormData): Promise<State> {

    const validatedFields = CreateArticle.safeParse({
        cod_art: formData.get('cod_art'),
        name: formData.get('name'),
        pvp: formData.get('pvp'),
        category: formData.get('category'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan datos. Error al crear un nuevo artículo.',
        }
    }
    const { cod_art, name, pvp, category } = validatedFields.data;
    try {
        const newArticle: typeof schema.articlesTable.$inferInsert = {
            cod_art: cod_art,
            name: name,
            pvp: pvp,
            category: category,
        }

        await db.insert(schema.articlesTable).values(newArticle);
    } catch (error) {
        console.error(error);
        throw new Error('Error base de datos: Error al crear artículo.')
    }

    revalidatePath('/dashboard/maintance/articles');
    redirect('/dashboard/maintance/articles');
}

const UpdateArticle = ArticleFormSchema.omit({ id: true })

export async function updateArticle(id: string, prevState: State, formData: FormData) {
    const validatedFields = UpdateArticle.safeParse({
        cod_art: formData.get('cod_art'),
        name: formData.get('name'),
        pvp: formData.get('pvp'),
        category: formData.get('category'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan datos. Error al editar el artículo seleccionado.',
        }
    }

    const { cod_art, name, pvp, category } = validatedFields.data;
    try {
        await db.update(schema.articlesTable).set({ cod_art: cod_art, name: name, pvp: pvp, category: category, updated_at: new Date(), }).where(eq(schema.articlesTable.id, id));
    } catch (error) {
        console.error(error);
        throw new Error('Error base de datos: Error al modificar artículo.');
    }

    revalidatePath('/dashboard/maintance/articles');
    redirect('/dashboard/maintance/articles');

}

export async function deleteArticle(id: string) {
    try {
        await db.delete(schema.articlesTable).where(eq(schema.articlesTable.id, id));
    } catch (error) {
        console.error(error);
        throw new Error('Error al eliminar el artículo');
    }
    revalidatePath('/dashboard/maintance/articles');
    redirect('/dashboard/maintance/articles');
}