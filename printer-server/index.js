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

    function getDate() {
        const date = Date.now();
        const today = new Date(date);

        let day = today.getDate().toString();
        if (day.length < 2) {
            day = "0" + day;
        }
        let month = (today.getMonth() + 1).toString();
        if (month.length < 2) {
            month = "0" + month;
        }
        let year = today.getFullYear();
        let hours = today.getHours();
        let minutes = today.getMinutes().toString();
        if (minutes.length < 2) {
            minutes = "0" + minutes;
        }

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
    const data = req.body;
    const articlesLines = data.articlesLines;
    const total = data.totalBill;
    const today = getDate();
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
    printer.println(today);
    printer.drawLine();
    // printer.table(['Qn', 'name', 'Price', 'Total'])
    printer.tableCustom([
        { text: 'Cant', align: 'CENTER', cols: 7 },
        { text: 'Nombre', align: 'CENTER', cols: 27 },
        { text: 'Pre.', align: 'CENTER', cols: 7 },
        { text: 'Total', align: 'CENTER', cols: 7 },
    ]);
    for (let i = 0; i < articlesLines.length; i++) {
        const articleLine = articlesLines[i];
        // printer.table([articleLine.quantity, articleLine.name.slice(0, 10), articleLine.price, articleLine.total]);
        printer.tableCustom([
            { text: articleLine.quantity, align: 'CENTER', cols: 7 },
            { text: ` ${articleLine.name.toUpperCase().slice(0, 25)} `, align: 'LEFT', cols: 27 },
            {
                text: `${articleLine.price.toFixed(2).toString().replace('.', ',')}`, align: 'CENTER', cols: 7
            },
            { text: `${articleLine.price.toFixed(2).toString().replace('.', ',')}`, align: 'CENTER', cols: 7 },
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

    try {
        const data = printer.getBuffer();
        printerPort.open((err) => {
            if (err) {
                return res.status(503).json({ error: "Printer unavailable" });
            }
            console.log(`✅ Port ${printerPort.path} open correctly.`);
            printerPort.write(data, (err) => {
                if (err) {
                    return res.status(503).json({ error: "Error trying to print" });
                }
                console.log(`Data send it correctly to port ${printerPort.path}.`);
                printer.clear();
                printerPort.close();
            });
        });
        console.log('Print success.');
    } catch (error) {
        console.error('Print error:', error);
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

        console.log('Cashdrawer open!.');
    } catch (error) {
        console.error('Cashdrawer error:', error);
    }
});

app.post('/example', async (req, res) => {
    const data = req.body;
    const articlesLines = data.articlesLines;
    //Header
    printer.alignCenter();
    printer.println("Cafeteria");
    await printer.printImage('./assets/iestacio_logo.png');
    printer.bold(true);
    printer.println("L'ESTACIÓ");
    printer.bold(false);
    printer.println("Ctra. l'estció S/N");
    printer.println("Tel: 96 291 93 75");
    printer.println("Email: 46006100@edu.gva.es")
    printer.drawLine();

    //Ticket lines
    printer.alignLeft();
    printer.println('Articles lines');
    printer.drawLine();
    printer.table(['Qn', 'name', 'Price', 'Total'])
    for (let i = 0; i < articlesLines.length; i++) {
        const articleLine = articlesLines[i];
        printer.table([articleLine.quantity, articleLine.name.slice(0, 23), articleLine.price, articleLine.total]);
    }
    printer.drawLine();
    //Footer
    printer.alignCenter();
    printer.println("Gracies per la seua visita");
    printer.printQR('https://portal.edu.gva.es/iestacio/');
    printer.newLine();
    printer.newLine();
    printer.newLine();
    console.log(printer.getText());
    res.json({ ticket: printer.getText() });
})

app.listen(port, () => {
    console.log(`Print server listening on http://localhost:${port}`);
})