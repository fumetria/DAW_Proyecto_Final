import bcrypt from 'bcrypt';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from './db/schema';
import { eq } from 'drizzle-orm';


const db = drizzle(process.env.DATABASE_URL!);

async function main() {
    const user: typeof usersTable.$inferInsert = {
        name: 'Pepe',
        email: 'pepe@email.com',
        password: '123456',
        dni: '48608583L',
        surname1: 'Mined',
        surname2: 'Wolf',
        is_employee: true,
        is_admin: true,
    }

    const hashedPasword = await bcrypt.hash(user.password, 10);
    user.password = hashedPasword;

    await db.insert(usersTable).values(user);
    console.log('New user created!');

    const users = await db.select().from(usersTable);
    console.log('Getting list of users: ', users);

    await db.update(usersTable)
        .set({ surname2: 'Dog' })
        .where(eq(usersTable.email, user.email));
    console.log('User updated!');

    await db.delete(usersTable).where(eq(usersTable.email, user.email));
    console.log('User deleted!');
}

main();