import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { user } from "./app/lib/types/types";
import bcrypt from 'bcrypt';
import * as schema from '@/app/db/schema';
import { drizzle } from 'drizzle-orm/neon-http';
// import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!, { schema });
//https://nextjs.org/learn/dashboard-app/adding-authentication
async function getUser(email: string): Promise<user | undefined> {
    try {
        const user = await db.select().from(schema.usersTable).where(eq(schema.usersTable.email, email));
        return user[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}
export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    callbacks: {
        ...authConfig.callbacks,
        jwt({ token, user }) {
            if (user) token.role = user.rol;
            return token;
        },
        session({ session, token }) {
            if (session.user) session.user.role = token.role as string;
            return session;
        },
    },
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);

            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);
                if (!user || !user.is_active) return null;
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch && user.is_active) return {
                    name: user.name,
                    email: user.email,
                    rol: user.rol,
                };
            }

            console.log('Invalid credentials');
            return null;
        },
    })]
});
