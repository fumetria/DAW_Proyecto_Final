import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
// import { drizzle } from 'drizzle-orm/node-postgres';
import { eq, DrizzleError } from 'drizzle-orm';
import * as schema from '@/app/db/schema';
import bcrypt from 'bcrypt';
import { renderProgress } from './script-progress-bar';

const db = drizzle(process.env.DATABASE_URL!, { schema });

export const items = [
    {
        "cod_art": "1",
        "name": "ESPECIAL DE LA CASA",
        "category": "BOCADILLOS",
        "pvp": 6,
    },
    {
        "cod_art": "2",
        "name": "BLANCO Y NEGRO",
        "category": "BOCADILLOS",
        "pvp": 6,
    },
    {
        "cod_art": "3",
        "name": "ALMUSSAFES",
        "category": "BOCADILLOS",
        "pvp": 6,
    },
    {
        "cod_art": "4",
        "name": "XIMO",
        "category": "BOCADILLOS",
        "pvp": 6,
    },
    {
        "cod_art": "5",
        "name": "SERRANITO",
        "category": "BOCADILLOS",
        "pvp": 6,
    },
    {
        "cod_art": "6",
        "name": "VEGETAL",
        "category": "BOCADILLOS",
        "pvp": 6,
    },
    {
        "cod_art": "7",
        "name": "CHIVITO",
        "category": "BOCADILLOS ESPECIALES",
        "pvp": 7,
    },
    {
        "cod_art": "8",
        "name": "BRASCADA",
        "category": "BOCADILLOS ESPECIALES",
        "pvp": 7,
    },
    {
        "cod_art": "9",
        "name": "FULL",
        "category": "BOCADILLOS ESPECIALES",
        "pvp": 7,
    },
    {
        "cod_art": "1B",
        "name": "COCA COLA",
        "category": "REFRESCOS",
        "pvp": 2.5,
    },
    {
        "cod_art": "2B",
        "name": "COCA COLA ZERO",
        "category": "REFRESCOS",
        "pvp": 2.5,
    },
    {
        "cod_art": "3B",
        "name": "COCA COLA ZERO ZERO",
        "category": "REFRESCOS",
        "pvp": 2.5,
    },
    {
        "cod_art": "4B",
        "name": "FANTA NARANJA",
        "category": "REFRESCOS",
        "pvp": 2.5,
    },
    {
        "cod_art": "5B",
        "name": "SPRITE",
        "category": "REFRESCOS",
        "pvp": 2.5,
    },
    {
        "cod_art": "6B",
        "name": "AQUARIUS",
        "category": "REFRESCOS",
        "pvp": 2.5,
    },
    {
        "cod_art": "1A",
        "name": "AGUA GRANDE",
        "category": "AGUAS Y ZUMOS",
        "pvp": 2.25,
    },
    {
        "cod_art": "2A",
        "name": "AGUA PEQUEÑA",
        "category": "AGUAS Y ZUMOS",
        "pvp": 1.90,
    },
    {
        "cod_art": "3A",
        "name": "ZUMO NARANJA",
        "category": "AGUAS Y ZUMOS",
        "pvp": 2.35,
    },
    {
        "cod_art": "1D",
        "name": "AMSTEL",
        "category": "CERVEZAS",
        "pvp": 2.35,
    },
    {
        "cod_art": "2D",
        "name": "ESTRELLA GALICIA",
        "category": "CERVEZAS",
        "pvp": 2.35,
    },
    {
        "cod_art": "3D",
        "name": "AMSTEL 1L",
        "category": "CERVEZAS",
        "pvp": 4,
    },
    {
        "cod_art": "1C",
        "name": "CAFÉ SOLO",
        "category": "CAFÉS E INFUSIONES",
        "pvp": 1.4,
    },
    {
        "cod_art": "2C",
        "name": "CORTADO",
        "category": "CAFÉS E INFUSIONES",
        "pvp": 1.5,
    },
    {
        "cod_art": "3C",
        "name": "CAFÉ CON LECHE",
        "category": "CAFÉS E INFUSIONES",
        "pvp": 1.6,
    },
    {
        "cod_art": "4C",
        "name": "MANZANILLA",
        "category": "CAFÉS E INFUSIONES",
        "pvp": 1.4,
    },
    {
        "cod_art": "5C",
        "name": "TIMONET",
        "category": "CAFÉS E INFUSIONES",
        "pvp": 1.4,
    },

]


async function categoriesExample() {
    const categories = new Set(items.map((item) => item.category.toLocaleLowerCase()));
    const total = categories.size;
    let current = 0;
    console.log('\nIntroduciendo categorias...\n');

    for (const category of categories) {
        current++;
        try {
            const newCategory: typeof schema.categoriesTable.$inferInsert = {
                name: category,
            }
            const query = await db.insert(schema.categoriesTable).values(newCategory).onConflictDoNothing().returning();
            if (query.length > 0) {
                console.log(`Data inserted! ${category}. + ${query}`);
            } else {
                console.log(`Category already exists: ${category}`);
            }
        } catch (error) {
            if (error instanceof DrizzleError) {
                console.error('Message: ', error.message);
                console.error('Cause: ', error.cause);
            }
        }
        renderProgress(current, total, 'Categorias');
    }
    console.log('\n✅ Categories seed finalizado. ')
}

async function articlesExample() {
    const total = items.length;
    let current = 0;
    console.log('\nInserting articles...\n');
    for (const item of items) {
        current++;
        try {
            const itemCategory = await db.select().from(schema.categoriesTable).where(eq(schema.categoriesTable.name, item.category.toLocaleLowerCase()));
            //articleCategory es un array, por tanto, para acceder al valor hay que seleccionar el elemento 0 del array

            if (!itemCategory.length) {
                console.error(`Category '${item.category}' not found. Aborting insert article '${item.name}'.`);
            } else {
                const newArticle: typeof schema.articlesTable.$inferInsert = {
                    name: item.name,
                    cod_art: item.cod_art,
                    category: itemCategory[0].id,
                    pvp: item.pvp,
                }
                const res = await db.insert(schema.articlesTable).values(newArticle).onConflictDoNothing().returning();
                if (res.length > 0) {
                    console.log('Article inserted!');

                } else {
                    console.log(`The article ${item.name} is already inserted.`);
                }

            }
        } catch (error) {
            if (error instanceof DrizzleError) {
                console.error('Message: ', error.message);
                console.error('Cause: ', error.cause);
            };
        }
        renderProgress(current, total, 'Articles');

    }
    console.log('\n✅ Articles seed finished');
}

async function userExample() {

    try {
        const admin = {
            email: "admin@example.com",
            password: "user1234",
            dni: "12345678A",
            name: "Admin",
            surname1: "User",
        }
        const hashedPassword = await bcrypt.hash(admin.password, 10);

        const newUser: typeof schema.usersTable.$inferInsert = {
            email: admin.email,
            name: admin.name,
            password: hashedPassword,
            dni: admin.dni,
            surname1: admin.surname1,
        }

        const res = await db.insert(schema.usersTable).values(newUser).onConflictDoNothing().returning();
        if (res.length > 0) {
            console.log('User inserted!');
            return;
        }
        console.log(`The user ${admin.name} is already inserted.`)
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error('Message: ', error.message);
            console.error('Cause: ', error.cause);
        };
    }


}

async function newReceiptNumberSerie() {
    try {
        const newReceiptNumberSerie: typeof schema.numsReceiptsTable.$inferInsert = {
            serie: 'FS',
            year: 26,
            number: 0,
        };
        const res = await db.insert(schema.numsReceiptsTable).values(newReceiptNumberSerie).onConflictDoNothing().returning();
        if (res.length > 0) {
            console.log('Receipt number created!');
            return;
        }
        console.error('Receipt number is already created!');
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error('Message: ', error.message);
            console.error('Cause: ', error.cause);
        };
    }
}

async function seedDB() {
    await categoriesExample();
    await articlesExample();
    await userExample();
    await newReceiptNumberSerie();
}

seedDB();

