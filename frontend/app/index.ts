import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from './db/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
    const user: typeof usersTable.$inferInsert = {
        dni: '48606974E',
        name: 'John',
        surname1: 'Mined',
        surname2: 'Wolf',
        is_employee: true,
        is_admin: true,
    }

    await db.insert(usersTable).values(user);
    console.log('New user created!');

    const users = await db.select().from(usersTable);
    console.log('Getting list of users: ', users);
}

main();