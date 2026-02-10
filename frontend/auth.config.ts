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
                return isLoggedIn;
            }

            if (isLoggedIn && pathname === '/login') {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        }
    },
    providers: [],
} satisfies NextAuthConfig;


