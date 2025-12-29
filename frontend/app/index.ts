import bcrypt from 'bcrypt';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { articlesTable, categoriesTable, usersTable } from './db/schema';
import { eq, sql } from 'drizzle-orm';
import * as schema from '@/app/db/schema';


const db = drizzle(process.env.DATABASE_URL!, { schema });

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

async function articlesExample() {

    const categories = ["books", "food"];

    await Promise.all(
        categories.map(async (category) => {
            try {
                const category1: typeof categoriesTable.$inferInsert = {
                    name: category,
                }
                await db.insert(categoriesTable).values(category1);
            } catch (error) {
                console.error('Error: ', error)
            }
        })
    )


    const categoriesData = await db.select().from(categoriesTable);
    console.log('Categories list: ', categoriesData);

    const articles = [
        {
            name: 'mybook',
            cod_art: 'a01',
            category: 'books',
            price: 15.00,
        }
        ,

        {
            name: 'mybike',
            cod_art: 'b01',
            category: 'bikes',
            price: 100,
        }
    ];

    await Promise.all(
        articles.map(async (article) => {
            try {
                const articleCategory = await db.select().from(categoriesTable).where(eq(categoriesTable.name, article.category));
                //articleCategory es un array, por tanto, para acceder al valor hay que seleccionar el elemento 0 del array
                if (articleCategory.length) {
                    console.log(`Category selected:\n id: ${articleCategory[0].id}\n name: ${articleCategory[0].name}`);
                }

                if (!articleCategory.length) {
                    console.error(`Category '${article.category}' not found. Aborting insert article '${article.name}'.`);
                } else {
                    const newArticle: typeof articlesTable.$inferInsert = {
                        name: article.name,
                        cod_art: article.cod_art,
                        category: articleCategory[0].id,
                        pvp: article.price,
                    }
                    await db.insert(articlesTable).values(newArticle);
                    console.log('Article inserted');
                }
            } catch (error) {
                console.log(error);
            }
        })
    )
    //https://orm.drizzle.team/docs/relations
    const articlesList = await db.query.articlesTable.findMany({
        with: {
            category: true,
        }
    })
    console.log('Articles list: ', articlesList);

    await db.execute(sql`TRUNCATE TABLE categories RESTART IDENTITY CASCADE;`);
    await db.execute(sql`TRUNCATE TABLE articles;`);


}

main();
articlesExample();
