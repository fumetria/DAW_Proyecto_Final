import { ThermalPrinter, PrinterTypes } from 'node-thermal-printer';
import { SerialPort } from 'serialport';
import { loadEnvFile } from 'node:process';

loadEnvFile('./.env');
export const printerPort = new SerialPort({
    path: process.env.PRINTER_PORT,       // Set here your Epson virtual port
    baudRate: 9600,
    autoOpen: false,
});

export const printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: `serial:${printerPort.path}`,
    options: {
        baudRate: 9600,
    },
    characterSet: process.env.CHARACTER_SET,
    removeSpecialCharacters: false,
    lineCharacter: "=",
});