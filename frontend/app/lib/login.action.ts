'use server';

import 'dotenv/config';
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { drizzle } from "drizzle-orm/neon-http";
import { usersTable } from '@/app/db/schema';
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

const db = drizzle(process.env.DATABASE_URL!, { schema: { usersTable } });

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
        redirect('/dashboard')
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Credenciales inválidas.';
                default:
                    return 'Algo salió mal.';
            }
        }
        throw error;
    }

}

export async function getUserRole() {
    const session = await auth();
    if (!session?.user) return null;
    const email = session.user.email;
    if (!email) return null;
    const userRole = await db.select({ role: usersTable.rol }).from(usersTable).where(eq(usersTable.email, email));
    return userRole[0].role;
}