import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq, sql } from 'drizzle-orm';
import * as schema from '@/app/db/schema';


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
        "cod_art": "4C",
        "name": "TIMONET",
        "category": "CAFÉS E INFUSIONES",
        "pvp": 1.4,
    },

]


async function categoriesExample() {
    const categories = new Set(items.map((item) => item.category.toLocaleLowerCase()));
    for (const category of categories) {
        try {
            const newCategory: typeof schema.categoriesTable.$inferInsert = {
                name: category,
            }
            await db.insert(schema.categoriesTable).values(newCategory);
            console.log(`Data inserted! ${category}.`);
        } catch (error) {
            console.error(error);
        }
    }
}

categoriesExample()