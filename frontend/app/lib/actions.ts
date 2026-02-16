'use server';
import { z } from 'zod';
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-http';
import bcrypt from 'bcrypt';
// import { drizzle } from 'drizzle-orm/node-postgres';
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


export async function toggleArticleActive(formData: FormData) {
    const articleId = formData.get('articleId') as string;
    const isActive = formData.get('isActive') === 'on';

    await db
        .update(schema.articlesTable)
        .set({ is_active: isActive })
        .where(eq(schema.articlesTable.id, articleId));

    revalidatePath('/dashboard/maintance/articles');
    redirect('/dashboard/maintance/articles');
}

// --- Users ---

const UserFormSchema = z.object({
    email: z.string().email('Email no válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    dni: z.string().min(1, 'DNI obligatorio').max(12),
    name: z.string().min(1, 'Nombre obligatorio'),
    surname1: z.string().min(1, 'Primer apellido obligatorio'),
    surname2: z.string().optional(),
    rol: z.enum(['admin', 'user'], { required_error: 'Selecciona un rol' }),
});

export type UserFormState = {
    errors?: {
        email?: string[];
        password?: string[];
        dni?: string[];
        name?: string[];
        surname1?: string[];
        rol?: string[];
    };
    message?: string | null;
};

export async function createUser(prevState: UserFormState | null, formData: FormData): Promise<UserFormState> {
    const validated = UserFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        dni: String(formData.get('dni')).trim(),
        name: formData.get('name'),
        surname1: formData.get('surname1'),
        surname2: formData.get('surname2') || undefined,
        rol: formData.get('rol') || 'user',
    });

    if (!validated.success) {
        return {
            errors: validated.error.flatten().fieldErrors,
            message: 'Revisa los datos del formulario.',
        };
    }

    const { email, password, dni, name, surname1, surname2, rol } = validated.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.insert(schema.usersTable).values({
            email,
            password: hashedPassword,
            dni,
            name,
            surname1,
            surname2: surname2 || null,
            rol,
        });
    } catch (error) {
        console.error(error);
        return { message: 'Error al crear el usuario (email o DNI ya existentes).' };
    }

    revalidatePath('/dashboard/maintance/users');
    redirect('/dashboard/maintance/users');
}

export async function deleteUser(id: string) {
    try {
        await db.delete(schema.usersTable).where(eq(schema.usersTable.id, id));
    } catch (error) {
        console.error(error);
        throw new Error('Error al eliminar el usuario');
    }
    revalidatePath('/dashboard/maintance/users');
    redirect('/dashboard/maintance/users');
}

export async function toggleUserActive(formData: FormData) {
    const userId = formData.get('userId') as string;
    const isActive = formData.get('isActive') === 'on';

    await db
        .update(schema.usersTable)
        .set({ is_active: isActive })
        .where(eq(schema.usersTable.id, userId));

    revalidatePath('/dashboard/maintance/users');
    redirect('/dashboard/maintance/users');
}

const UpdateUserSchema = z.object({
    email: z.string().email('Email no válido'),
    password: z.string().optional(),
    dni: z.string().min(1, 'DNI obligatorio').max(12),
    name: z.string().min(1, 'Nombre obligatorio'),
    surname1: z.string().min(1, 'Primer apellido obligatorio'),
    surname2: z.string().optional(),
    rol: z.enum(['admin', 'user'], { required_error: 'Selecciona un rol' }),
});

export async function updateUser(id: string, prevState: UserFormState | null, formData: FormData): Promise<UserFormState> {
    const passwordRaw = formData.get('password');
    const validated = UpdateUserSchema.safeParse({
        email: formData.get('email'),
        password: typeof passwordRaw === 'string' && passwordRaw.length > 0 ? passwordRaw : undefined,
        dni: String(formData.get('dni')).trim(),
        name: formData.get('name'),
        surname1: formData.get('surname1'),
        surname2: formData.get('surname2') || undefined,
        rol: formData.get('rol') || 'user',
    });

    if (!validated.success) {
        return {
            errors: validated.error.flatten().fieldErrors,
            message: 'Revisa los datos del formulario.',
        };
    }

    const { email, password, dni, name, surname1, surname2, rol } = validated.data;
    const update: Partial<typeof schema.usersTable.$inferInsert> = {
        email,
        dni,
        name,
        surname1,
        surname2: surname2 || null,
        rol,
        updated_at: new Date(),
    };
    if (password && password.length >= 6) {
        update.password = await bcrypt.hash(password, 10);
    }

    try {
        await db.update(schema.usersTable).set(update).where(eq(schema.usersTable.id, id));
    } catch (error) {
        console.error(error);
        return { message: 'Error al actualizar el usuario (email o DNI ya existentes).' };
    }

    revalidatePath('/dashboard/maintance/users');
    revalidatePath(`/dashboard/maintance/users/${id}`);
    redirect('/dashboard/maintance/users');
}

export type UserSafe = {
    id: string;
    email: string;
    dni: string;
    name: string;
    surname1: string;
    surname2: string | null;
    rol: string;
    is_active: boolean | null;
};

export async function getUserId(id: string): Promise<UserSafe | null> {
    try {
        const [row] = await db
            .select({
                id: schema.usersTable.id,
                email: schema.usersTable.email,
                dni: schema.usersTable.dni,
                name: schema.usersTable.name,
                surname1: schema.usersTable.surname1,
                surname2: schema.usersTable.surname2,
                rol: schema.usersTable.rol,
                is_active: schema.usersTable.is_active,
            })
            .from(schema.usersTable)
            .where(eq(schema.usersTable.id, id));
        return row ?? null;
    } catch (error) {
        console.error(error);
        return null;
    }
}