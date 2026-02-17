import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    rol?: string;
  }

  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
