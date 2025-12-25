# Print server for Thermal Printers

## Overview

This project sets up a printer server for thermal printers using Node.js. The server allows you to work with POS equipment, such as thermal printers and cash drawers, through a simple HTTP interface.

We can work from a frontend cloud application and communicate with our local POS equipment via this server. In our case, we are using a EPSON TM-T20II printer with a virtual COM port assigned with EPSON TM Virtual Port Driver Port application from EPSON.

## Dependencies

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [node-thermal-printer](https://www.npmjs.com/package/node-thermal-printer)
- [serialport](https://www.npmjs.com/package/serialport)
