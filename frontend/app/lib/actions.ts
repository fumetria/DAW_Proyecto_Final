'use server';
import { z } from 'zod';
import 'dotenv/config';
import { DrizzleError, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-http';
import bcrypt from 'bcrypt';
// import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/app/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getUserRole } from './login.action';

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
        const userRole = await getUserRole();
        if (userRole != 'admin') {
            return;
        }
        if (id === userRole) {
            return;
        }
        await db.delete(schema.usersTable).where(eq(schema.usersTable.id, id));
    } catch (error) {
        if (error instanceof DrizzleError) {
            throw new Error('Error base de datos: Error al crear usuario.')
        }
        console.error('Algo salió mal.');
    }
    revalidatePath('/dashboard/maintance/users');
    redirect('/dashboard/maintance/users');
}

export async function toggleUserActive(formData: FormData) {
    const userRole = await getUserRole();
    if (userRole != 'admin') {
        return;
    }
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

const CategoryFormSchema = z.object({
    id: z.number(),
    name: z.string({
        invalid_type_error: 'Por favor, introduzca un nombre válido'
    }),
})

const CreateCategory = CategoryFormSchema.omit({ id: true });

export type CategoryFormState = {
    errors?: {
        name?: string[];
    };
    message?: string | null;
}

export async function createCategory(prevState: CategoryFormState | null, formData: FormData): Promise<CategoryFormState> {
    const validatedFields = CreateCategory.safeParse({
        name: formData.get('category_name'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan datos. Error al crear nueva categoría.',
        }
    }
    const { name } = validatedFields.data;
    try {
        const newCategory: typeof schema.categoriesTable.$inferInsert = {
            name: name,
        }

        await db.insert(schema.categoriesTable).values(newCategory);
    } catch (error) {
        if (error instanceof DrizzleError) {
            throw new Error('Error base de datos: Error al crear categoría.')
        }
    }
    revalidatePath('/dashboard/maintance/categories');
    redirect('/dashboard/maintance/categories');
}

const UpdateCategory = CategoryFormSchema.omit({ id: true });

export async function updateCategory(id: number, prevState: CategoryFormState | null, formData: FormData) {
    const validatedFields = UpdateCategory.safeParse({
        name: formData.get('category_name'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan datos. Error al actualizar categoría.',
        }
    }
    const { name } = validatedFields.data;
    try {
        await db.update(schema.categoriesTable).set({ name: name, updated_at: new Date() }).where(eq(schema.categoriesTable.id, id));
    } catch (error) {
        if (error instanceof DrizzleError) {
            throw new Error('Error base de datos: Error al editar categoría.')
        }
    }
    revalidatePath('/dashboard/maintance/categories');
    redirect('/dashboard/maintance/categories');
}

export async function deleteCategory(id: number) {
    try {
        await db.delete(schema.categoriesTable).where(eq(schema.categoriesTable.id, id));
    } catch (error) {
        if (error instanceof DrizzleError) {
            throw new Error('Error al eliminar el artículo');
        }
    }
    revalidatePath('/dashboard/maintance/categories');
    redirect('/dashboard/maintance/categories');
}


const TaxFormSchema = z.object({
    id: z.number(),
    value: z.coerce.number({
        invalid_type_error: 'Introduce un porcentaje válido',
    }).int('El IVA debe ser un número entero').min(0, 'El IVA no puede ser negativo').max(100, 'El IVA no puede superar 100'),
});

const CreateTaxFields = TaxFormSchema.omit({ id: true });
const UpdateTaxFields = TaxFormSchema.omit({ id: true });

export type TaxFormState = {
    errors?: {
        value?: string[];
    };
    message?: string | null;
};

export async function createTax(prevState: TaxFormState | null, formData: FormData): Promise<TaxFormState> {
    const validatedFields = CreateTaxFields.safeParse({
        value: formData.get('tax_value'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan datos o el valor no es válido. Error al crear tipo de IVA.',
        };
    }
    const { value } = validatedFields.data;
    try {
        const row: typeof schema.taxesTable.$inferInsert = { value };
        await db.insert(schema.taxesTable).values(row);
    } catch (error) {
        if (error instanceof DrizzleError) {
            throw new Error('Error base de datos: no se pudo crear el tipo de IVA (¿valor duplicado?).');
        }
        throw error;
    }
    revalidatePath('/dashboard/maintance/taxes');
    redirect('/dashboard/maintance/taxes');
}

export async function updateTax(id: number, prevState: TaxFormState | null, formData: FormData) {
    const validatedFields = UpdateTaxFields.safeParse({
        value: formData.get('tax_value'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan datos o el valor no es válido. Error al actualizar tipo de IVA.',
        };
    }
    const { value } = validatedFields.data;
    try {
        await db
            .update(schema.taxesTable)
            .set({ value, updated_at: new Date() })
            .where(eq(schema.taxesTable.id, id));
    } catch (error) {
        if (error instanceof DrizzleError) {
            throw new Error('Error base de datos: no se pudo editar el tipo de IVA.');
        }
        throw error;
    }
    revalidatePath('/dashboard/maintance/taxes');
    redirect('/dashboard/maintance/taxes');
}

export async function deleteTax(id: number) {
    try {
        await db.delete(schema.taxesTable).where(eq(schema.taxesTable.id, id));
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error);
        if (msg.includes('foreign key') || msg.includes('23503') || msg.includes('violates foreign key')) {
            throw new Error('No se puede eliminar: hay artículos que usan este tipo de IVA.');
        }
        if (error instanceof DrizzleError) {
            throw new Error('Error al eliminar el tipo de impuesto.');
        }
        throw error;
    }
    revalidatePath('/dashboard/maintance/taxes');
    redirect('/dashboard/maintance/taxes');
}


const PaymentMethodFormSchema = z.object({
    id: z.number(),
    name: z.string({
        invalid_type_error: 'Por favor, introduzca un nombre válido'
    }),
})

const CreatePaymentMethod = CategoryFormSchema.omit({ id: true });

export type PaymentMethodFormState = {
    errors?: {
        name?: string[];
    };
    message?: string | null;
}

export async function createPaymentMethod(prevState: PaymentMethodFormState | null, formData: FormData): Promise<PaymentMethodFormState> {
    const validatedFields = CreatePaymentMethod.safeParse({
        name: formData.get('payment_method_name'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan datos. Error al crear nueva categoría.',
        }
    }
    const { name } = validatedFields.data;
    try {
        const newPaymentMethod: typeof schema.paymentMethodsTable.$inferInsert = {
            name: name,
        }

        await db.insert(schema.paymentMethodsTable).values(newPaymentMethod);
    } catch (error) {
        if (error instanceof DrizzleError) {
            throw new Error('Error base de datos: Error al crear método de pago.')
        }
    }
    revalidatePath('/dashboard/maintance/payment-methods');
    redirect('/dashboard/maintance/payment-methods');
}

const UpdatePaymentMethod = PaymentMethodFormSchema.omit({ id: true });

export async function updatePaymentMethod(id: number, prevState: PaymentMethodFormState | null, formData: FormData) {
    const validatedFields = UpdatePaymentMethod.safeParse({
        name: formData.get('payment-method-name'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan datos. Error al actualizar método de pago.',
        }
    }
    const { name } = validatedFields.data;
    try {
        await db.update(schema.paymentMethodsTable).set({ name: name, updated_at: new Date() }).where(eq(schema.paymentMethodsTable.id, id));
    } catch (error) {
        if (error instanceof DrizzleError) {
            throw new Error('Error base de datos: Error al editar categoría.')
        }
    }
    revalidatePath('/dashboard/maintance/payment-methods');
    redirect('/dashboard/maintance/payment-methods');
}

export async function deletePaymentMethod(id: number) {
    try {
        await db.delete(schema.paymentMethodsTable).where(eq(schema.paymentMethodsTable.id, id));
    } catch (error) {
        if (error instanceof DrizzleError) {
            throw new Error('Error al eliminar el artículo');
        }
    }
    revalidatePath('/dashboard/maintance/payment-methods');
    redirect('/dashboard/maintance/payment-methods');
}