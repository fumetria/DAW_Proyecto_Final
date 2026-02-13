import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
// import { drizzle } from 'drizzle-orm/node-postgres';
import { eq, asc, DrizzleError } from 'drizzle-orm';
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

async function paymentMethodsExample() {

    const paymentMethods = [
        {
            name: "Efectivo",
        },
        { name: "Tarjeta", },
        { name: "Bizum" },
        { name: "Cheque" }
    ]
    const total = paymentMethods.length;
    let current = 0;
    console.log('\nInserting payment methods...\n');
    for (const paymentMethod of paymentMethods) {
        current++;
        try {
            const newPaymentMethod: typeof schema.payment_methodsTable.$inferInsert = {
                name: paymentMethod.name,
            }
            const res = await db.insert(schema.payment_methodsTable).values(newPaymentMethod).onConflictDoNothing().returning();
            if (res.length > 0) {
                console.log('Payment method inserted!');
            } else {
                console.log(`The payment method ${paymentMethod.name} is already inserted.`);
            }
        } catch (error) {
            if (error instanceof DrizzleError) {
                console.error('Message: ', error.message);
                console.error('Cause: ', error.cause);
            };
        }
        renderProgress(current, total, 'Payment methods');
    }
    console.log('\n✅ Payment methods seed finished');
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

async function receiptsExample() {
    const ADMIN_EMAIL = 'admin@example.com';
    const SERIE = 'FS';
    const YEAR = 26;

    const [user] = await db.select().from(schema.usersTable).where(eq(schema.usersTable.email, ADMIN_EMAIL));
    const paymentMethods = await db.select().from(schema.payment_methodsTable);
    if (!user || !paymentMethods.length) {
        console.error('Seed receipts: need user and payment methods. Run userExample() and paymentMethodsExample() first.');
        return;
    }

    const receiptNumbers = [1, 2, 3];
    const total = receiptNumbers.length;
    let current = 0;
    console.log('\nInserting receipts...\n');

    for (const num of receiptNumbers) {
        current++;
        const num_receipt = `${SERIE}-${YEAR}-${String(num).padStart(4, '0')}`;
        try {
            const existing = await db.select().from(schema.receiptsTable).where(eq(schema.receiptsTable.num_receipt, num_receipt));
            if (existing.length > 0) {
                console.log(`Receipt ${num_receipt} already exists.`);
                renderProgress(current, total, 'Receipts');
                continue;
            }
            const newReceipt: typeof schema.receiptsTable.$inferInsert = {
                num_receipt,
                serie: SERIE,
                year: YEAR,
                number: num,
                total: 0,
                user_email: user.email,
                payment_method: paymentMethods[0].id,
                is_open: false,
            };
            await db.insert(schema.receiptsTable).values(newReceipt);
            console.log(`Receipt inserted: ${num_receipt}`);
        } catch (error) {
            if (error instanceof DrizzleError) {
                console.error('Message: ', error.message);
                console.error('Cause: ', error.cause);
            }
        }
        renderProgress(current, total, 'Receipts');
    }

    // Actualizar contador de números de tique
    await db.update(schema.numsReceiptsTable).set({ number: 3 }).where(eq(schema.numsReceiptsTable.serie, SERIE));
    console.log('\n✅ Receipts seed finished.');
}

async function receiptLinesExample() {
    const receiptsToFill = ['FS-26-0001', 'FS-26-0002', 'FS-26-0003'];

    const articles = await db.select().from(schema.articlesTable);
    if (!articles.length) {
        console.error('Seed receipt lines: need articles. Run articlesExample() first.');
        return;
    }

    let current = 0;
    const total = receiptsToFill.length * 3; // ~3 líneas por tique
    console.log('\nInserting receipt lines...\n');

    for (const numReceipt of receiptsToFill) {
        const receipt = await db.select().from(schema.receiptsTable).where(eq(schema.receiptsTable.num_receipt, numReceipt));
        if (!receipt.length) continue;

        const linesExist = await db.select().from(schema.receiptsLineTable).where(eq(schema.receiptsLineTable.receipt_id, numReceipt));
        if (linesExist.length > 0) {
            console.log(`Lines for ${numReceipt} already exist.`);
            current += 3;
            continue;
        }

        let receiptTotal = 0;
        for (let i = 0; i < 3; i++) {
            current++;
            const art = articles[i % articles.length];
            const quantity = i + 1;
            const price = art.pvp;
            const lineTotal = Math.round(price * quantity * 100) / 100;
            receiptTotal += lineTotal;
            try {
                const newLine: typeof schema.receiptsLineTable.$inferInsert = {
                    cod_art: art.cod_art,
                    details: art.name,
                    quantity,
                    price,
                    total: lineTotal,
                    receipt_id: numReceipt,
                };
                await db.insert(schema.receiptsLineTable).values(newLine);
            } catch (error) {
                if (error instanceof DrizzleError) {
                    console.error('Message: ', error.message);
                }
            }
            renderProgress(current, total, 'Receipt lines');
        }
        await db.update(schema.receiptsTable).set({ total: Math.round(receiptTotal * 100) / 100 }).where(eq(schema.receiptsTable.num_receipt, numReceipt));
    }
    console.log('\n✅ Receipt lines seed finished.');
}

async function endDaysExample() {
    const receipts = await db.select().from(schema.receiptsTable).orderBy(asc(schema.receiptsTable.number));
    if (receipts.length < 1) {
        console.error('Seed end-days: need at least one receipt. Run receiptsExample() first.');
        return;
    }

    const first = receipts[0];
    const last = receipts[receipts.length - 1];
    const dayTotal = receipts.reduce((sum, r) => sum + (r.total ?? 0), 0);
    const dateStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const existing = await db.select().from(schema.endDaysTable).where(eq(schema.endDaysTable.date, dateStr));
    if (existing.length > 0) {
        console.log(`End-day for ${dateStr} already exists.`);
        return;
    }

    try {
        const newEndDay: typeof schema.endDaysTable.$inferInsert = {
            date: dateStr,
            total: Math.round(dayTotal * 100) / 100,
            first_receipt_id: first.num_receipt,
            last_receipt_id: last.num_receipt,
            total_receipts: receipts.length,
        };
        await db.insert(schema.endDaysTable).values(newEndDay);
        console.log('End-day inserted:', dateStr);
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error('Message: ', error.message);
            console.error('Cause: ', error.cause);
        }
    }
    console.log('✅ End-days seed finished.');
}

async function seedDB() {
    await categoriesExample();
    await articlesExample();
    await userExample();
    await newReceiptNumberSerie();
    await paymentMethodsExample();
    await receiptsExample();
    await receiptLinesExample();
    await endDaysExample();
}

seedDB();

