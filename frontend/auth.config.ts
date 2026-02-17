import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const pathname = nextUrl.pathname;
            const protectedURLs = pathname.startsWith('/dashboard') || pathname.startsWith('/pos');

            if (protectedURLs) {
                if (!isLoggedIn) return false;
                const adminOnlyPaths =
                    pathname.startsWith('/dashboard/receipts') ||
                    pathname.startsWith('/dashboard/maintance');
                if (adminOnlyPaths && auth?.user?.role !== 'admin') {
                    return Response.redirect(new URL('/dashboard/forbidden', nextUrl));
                }
                return true;
            }

            if (isLoggedIn && pathname === '/login') {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        }
    },
    providers: [],
} satisfies NextAuthConfig;


