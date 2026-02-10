import { auth } from "@/auth";

export async function getUserSession() {
    const session = await auth();
    if (!session?.user) return null;
    const user = session.user;
    return user;
}