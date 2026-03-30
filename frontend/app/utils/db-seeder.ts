import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
// import { drizzle } from 'drizzle-orm/node-postgres';
import { DrizzleError } from 'drizzle-orm';
import * as schema from '@/app/db/schema';
import bcrypt from 'bcrypt';
import { renderProgress } from './script-progress-bar';
import { items, taxes } from './placeholder-data';

const db = drizzle(process.env.DATABASE_URL!, { schema });

let consoleCategoryErrors = "";
let consoleArticleErrors = "";
let consoleUserErrors = "";
let consolePaymentMethodErrors = "";
let consoleReceiptNumberErrors = "";
let consoleTaxErrors = "";

async function categoriesExample() {
    const categories = new Set(items.map((item) => item.category.toLocaleLowerCase()));
    const total = categories.size;
    let current = 0;
    console.log('Inserting categories...');

    for (const category of categories) {
        current++;
        try {
            const newCategory: typeof schema.categoriesTable.$inferInsert = {
                name: category,
            }
            const query = await db.insert(schema.categoriesTable).values(newCategory).onConflictDoNothing().returning();
            if (!query.length) {
                consoleCategoryErrors += `Category ${current}/${total}: Category '${category}' already exists\n`;
            }
        } catch (error) {
            if (error instanceof DrizzleError) {
                console.error('Message: ', error.message);
            }
        }
        renderProgress(current, total, 'Categorias');
    }
    console.log(`${consoleCategoryErrors.length > 0 ? '❌' : '✅'} Categories seed finished.\n`)
}

async function taxesExample() {
    const total = taxes.length;
    let current = 0;
    console.log('Inserting taxes...');
    for (const tax of taxes) {
        current++;
        try {
            const newTax: typeof schema.taxesTable.$inferInsert = {
                value: tax.value,
            }
            const query = await db.insert(schema.taxesTable).values(newTax).onConflictDoNothing().returning();
            if (!query.length) {
                consoleTaxErrors += `Tax ${current}/${total}: Tax '${tax.value}' already exists\n`;
            }
        } catch (error) {
            if (error instanceof DrizzleError) {
                console.error('Message: ', error.message);
            }
        }
        renderProgress(current, total, 'Taxes');
    }
    console.log(`${consoleTaxErrors.length > 0 ? '❌' : '✅'} Taxes seed finished.\n`)
}

async function articlesExample() {
    const total = items.length;
    let current = 0;
    console.log('Inserting articles...');
    const categories = await db.select().from(schema.categoriesTable);
    const categoryMap = new Map(categories.map(category => [category.name, category.id]));
    const taxes = await db.select().from(schema.taxesTable);
    const taxMap = new Map(taxes.map(tax => [tax.value, tax.id]));
    for (const item of items) {
        current++;
        try {
            const itemCategoryId = categoryMap.get(item.category.toLowerCase());
            const itemTaxId = taxMap.get(item.tax);
            if (!itemCategoryId) {
                console.error(`Category '${item.category}' not found. Aborting insert article '${item.name}'.`);
            } else {
                const newArticle: typeof schema.articlesTable.$inferInsert = {
                    name: item.name,
                    cod_art: item.cod_art,
                    category: itemCategoryId,
                    tax: itemTaxId,
                    pvp_without_tax: item.pvp_without_tax,
                    pvp: item.pvp,
                }
                const res = await db.insert(schema.articlesTable).values(newArticle).onConflictDoNothing().returning();
                if (!res.length) {
                    consoleArticleErrors += `Article ${current}/${total}: Article '${item.name}' already exists\n`;
                }
            }
        } catch (error) {
            if (error instanceof DrizzleError) {
                console.error('Message: ', error.message);
            };
        }
        renderProgress(current, total, 'Articles');

    }
    console.log(`${consoleArticleErrors.length > 0 ? '❌' : '✅'} Articles seed finished\n`);
}

async function userExample() {
    const users = [
        {
            email: "admin@example.com",
            password: "user1234",
            dni: "12345678A",
            name: "Admin",
            surname1: "User",
            role: 'admin',

        },
        {
            email: "employee@example.com",
            password: "user1234",
            dni: "87654321B",
            name: "Employee",
            surname1: "User",
            role: 'user',
        }
    ]
    const total = users.length;
    let current = 0;
    console.log('Inserting users...');

    for (const user of users) {
        try {
            current++;
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const newUser: typeof schema.usersTable.$inferInsert = {
                email: user.email,
                name: user.name,
                password: hashedPassword,
                dni: user.dni,
                surname1: user.surname1,
                rol: user.role,
            }
            const res = await db.insert(schema.usersTable).values(newUser).onConflictDoNothing({ target: schema.usersTable.email }).returning();
            if (!res.length) {
                consoleUserErrors += `User ${current}/${total}: User '${user.name}' already exists\n`;
            }
        } catch (error) {
            if (error instanceof DrizzleError) {
                console.error('Message: ', error.message);
            } else {
                console.error(error);
            }
        }
        renderProgress(current, total, 'Users');
    }
    console.log(`${consoleUserErrors.length > 0 ? '❌' : '✅'} Users seed finished\n`);
}

async function paymentMethodsExample() {
    const paymentMethods = [
        { name: 'Efectivo' },
        { name: 'Tarjeta' },
        { name: 'Transferencia' },
    ];
    const total = paymentMethods.length;
    let current: number = 0;
    console.log('Inserting payment methods...');
    for (const paymentMethod of paymentMethods) {
        current++;
        try {
            const newPaymentMethod: typeof schema.paymentMethodsTable.$inferInsert = {
                name: paymentMethod.name,
            }
            const res = await db.insert(schema.paymentMethodsTable).values(newPaymentMethod).onConflictDoNothing().returning();
            if (res.length === 0) {
                consolePaymentMethodErrors += `Payment method ${current}/${total}: Payment method '${paymentMethod.name}' already exists\n`;
            }
        } catch (error) {
            if (error instanceof DrizzleError) {
                console.error('Message: ', error.message);
            };
        }
        renderProgress(current, total, 'Payment methods');
    }
    console.log(`${consolePaymentMethodErrors.length > 0 ? '❌' : '✅'} Payment methods seed finished\n`);
}

async function newReceiptNumberSerie() {
    try {
        const newReceiptNumberSerie: typeof schema.numsReceiptsTable.$inferInsert = {
            serie: 'FS',
            year: 26,
            number: 0,
        };
        const res = await db.insert(schema.numsReceiptsTable).values(newReceiptNumberSerie).onConflictDoNothing().returning();
        if (!res.length) {
            consoleReceiptNumberErrors += `Receipt number alredy exists\n`;
        }
    } catch (error) {
        if (error instanceof DrizzleError) {
            console.error('Message: ', error.message);
        };
    }
}

async function printConsoleErrors() {
    if (consoleCategoryErrors.length > 0) {
        console.log('❌ \x1b[41mConsole errors:\x1b[49m');
        console.log(consoleCategoryErrors);
        console.log(consoleArticleErrors);
        console.log(consoleUserErrors);
        console.log(consolePaymentMethodErrors);
        console.log(consoleReceiptNumberErrors);
    }
}
async function seedDB() {
    console.log('\x1b[34mSeeding database...\x1b[0m');
    await Promise.all([
        categoriesExample(),
        paymentMethodsExample(),
        taxesExample(),
    ]);
    await articlesExample();
    await userExample();
    await newReceiptNumberSerie();

    if (consoleArticleErrors.length > 0 || consoleCategoryErrors.length > 0 || consoleUserErrors.length > 0 || consolePaymentMethodErrors.length > 0 || consoleReceiptNumberErrors.length > 0) {
        await printConsoleErrors();
        return;
    }
    console.log('\e[32mDatabase seeded successfully\e[0m');
}

seedDB();

