import express from 'express';
import { printerPort, printer } from './constants.js';
import cors from "cors";
import { loadEnvFile } from 'node:process';

loadEnvFile('./.env');

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors());

app.get('/status', async (req, res) => {
    const isConnected = await printer.isPrinterConnected();
    const printerInfo = printerPort;
    res.json({ printerIsConnected: isConnected, printerInfo: printerInfo.path });
})

app.get('/', (req, res) => {
    res.sendStatus(200);
})

app.post('/print', async (req, res) => {
    const {
        receiptLinesTable,
        totalReceipt,
        receiptNumber,
        receiptDate,
        printReceipt,
        openDrawer
    } = req.body;

    const articlesLines = receiptLinesTable;
    const total = totalReceipt;

    try {
        // Print receipt action
        if (printReceipt) {
            //Header
            printer.alignCenter();
            printer.println("Cafeteria");
            await printer.printImage('./assets/iestacio_logo.png');
            printer.bold(true);
            printer.println();
            printer.println("L'ESTACIÓ");
            printer.bold(false);
            printer.println("Ctra. l'estació S/N");
            printer.println("Tel: 96 291 93 75");
            printer.println("Email: 46006100@edu.gva.es")
            printer.drawLine();
            //Ticket lines
            printer.alignLeft();
            // Date - Receipt Number
            printer.tableCustom([
                { text: receiptDate, cols: 16 },
                { text: "", cols: 21 },
                { text: receiptNumber, cols: 11 }
            ]);
            printer.drawLine();

            // Receipt articles table
            printer.tableCustom([
                { text: 'Cant', align: 'CENTER', cols: 7 },
                { text: 'Nombre', align: 'CENTER', cols: 27 },
                { text: 'Pre.', align: 'CENTER', cols: 7 },
                { text: 'Total', align: 'CENTER', cols: 7 },
            ]);
            for (let i = 0; i < articlesLines.length; i++) {
                const articleLine = articlesLines[i];
                printer.tableCustom([
                    { text: articleLine.quantity, align: 'CENTER', cols: 7 },
                    { text: ` ${articleLine.name.toUpperCase().slice(0, 25)} `, align: 'LEFT', cols: 27 },
                    {
                        text: `${articleLine.price.toFixed(2).toString().replace('.', ',')}`, align: 'CENTER', cols: 7
                    },
                    { text: `${articleLine.total.toFixed(2).toString().replace('.', ',')}`, align: 'CENTER', cols: 7 },
                ]);
            }
            printer.drawLine();
            printer.alignRight();
            printer.println(`TOTAL: ${total.toFixed(2).toString().replace('.', ',')} €`);
            printer.drawLine();

            //Footer
            printer.alignCenter();
            printer.println("Gracies per la seua visita");
            printer.printQR('https://portal.edu.gva.es/iestacio/', { cellSize: 5 });
            printer.newLine();
            printer.newLine();
            printer.cut();
        }

        // Open drawer action if is checked
        if (openDrawer) {
            printer.openCashDrawer();
        }

        const data = printer.getBuffer();

        printerPort.open((err) => {
            if (err) {
                return res.status(503).json({ error: "Printer unavailable" });
            }

            printerPort.write(data, (err) => {
                if (err) {
                    return res.status(503).json({ error: "Error writing to printer" });
                }

                printer.clear();
                printerPort.close();
            });
        });

        return res.json({ ok: true });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal error" });
    }
})

app.post('/open-drawer', (req, res) => {
    printer.openCashDrawer();
    try {
        const data = printer.getBuffer();
        printerPort.open((err) => {
            if (!printerPort.isOpen) { return res.status(502).json({ error: "Cash drawer unavailable" }); }
            if (err) {
                return res.status(503).json({ error: "Cash drawer unavailable" });
            }
            console.log(`✅ Port ${printerPort.path} open correctly.`);

            printerPort.write(data, (err) => {
                if (err) {
                    return res.status(503).json({ error: "Error opening the cash drawer" });
                }
                console.log(`Data send it correctly to port ${printerPort.path}.`);
                printer.clear();
                printerPort.close();
            });


        });
        return res.json({ ok: true });
    } catch (error) {
        console.error('Cashdrawer error:', error);
    }
});

app.listen(port, () => {
    console.log(`Print server listening on http://localhost:${port}`);
})