# Proyecto final de DAW - BsnessApp

![BsnessApp main page](/docs/img/main.png)

## Introducción

BsnessApp es una aplicación SaaS o aplicación como servicio en el cual el cliente puede gestionar terminales de punto de venta (TPV) o Point Of Sale (POS) en inglés. Las funciones principales que pueden hacer los usuarios son:

- El usuario puede generar tickets y cobrar los tickets generados ha sus clientes.
- Obtener datos de ventas con diferentes filtros de datos.
- Crear informes de venta y exportarlos.
- Crear artículos.
- Acceso a la aplicación según rol en la empresa.

## Características técnicas

La aplicación esta hecha mediante las siguientes tecnologías:

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nextjs,react,postgres,tailwind,nodejs,ts&theme=light" />
  </a>
</p>

- [Nextjs](https://nextjs.org/): Usamos NextJS como frontend y backend para todo el proyecto.
- [React](https://react.dev/): Usamos React para toda la lógica del frontend.
- [Postgres](https://www.postgresql.org/): Usamos Postgres como base de datos.
  - [Drizzle ORM](https://orm.drizzle.team/): Para gestionar la base de datos, utilizamos Drizzle ORM que nos facilitará la gestión de la base de datos.
- [TailwindCSS](https://tailwindcss.com/): Usamos TailwindCSS como fuente para crear las interfaces.
- [NodeJS](https://nodejs.org/): Utilizamos NodeJS como backend para gestionar periféricos en local para la interfaz del TPV, como las impresoras térmicas.

## Guía de estilo

En cuanto a guía de estilo, podemos comprobar la guía de estilo de nuestra apliación en el siguiente enlace:
[Guía de estilo](https://www.bsnessapp.es/style-guide)

## Estructura del proyecto

El proyecto esta estructurado de la siguiente forma:

```bash
├───backend
├───frontend
│   ├───app
│   │   ├───colors
│   │   ├───dashboard
│   │   ├───db
│   │   ├───lib
│   │   ├───login
│   │   ├───pos
│   │   ├───style-guide
│   │   ├───ui
│   │   └───utils
│   ├───drizzle
│   └───public
└───printer-server
```

La aplicación principalmente funciona desde la carpeta frontend ya que Nextjs hace de frontend y backend desde un mismo directorio.

### Printer Server

El printer server es un servicio de impresión para impresoras térmicas mediante un servidor de Node.js. El servidor permite trabajar con equipos POS, como impresoras térmicas y cajas registradoras, a través de una interfaz HTTP sencilla.

La arquitectura permite que una aplicación frontend alojada en la nube se comunique con el hardware POS local a través de este servidor intermedio. En nuestro caso específico, se utiliza una impresora EPSON TM-T20II configurada mediante un puerto COM virtual, asignado utilizando la aplicación EPSON TM Virtual Port Driver Port proporcionada por EPSON.

#### Dependencias:

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [node-thermal-printer](https://www.npmjs.com/package/node-thermal-printer)
- [serialport](https://www.npmjs.com/package/serialport)

## Instalación

```bash
git clone https://github.com/fumetria/DAW_Proyecto_Final.git /ubicación

cd /ubicación

cd /frontend && pnpm install
```

Copiamos nuestro archivo .env.example en .env y configuramos nuestra base de datos. Desde la terminal ejecutamos:

```bash
cp .example.env .env
```

Añadimos los datos que nos solicita nuestro archivo _.env_

```bash
AUTH_SECRET=
DATABASE_URL=
```

- AUTH_SECRET: Este secret es el que nos pide NextJs para poder usar su sistema de autenticación. Podemos generar lo desde [este link](https://generate-secret.vercel.app/32)
- DATABASE_URL: Indicamos la ruta hacia la base de datos que tengamos montada, en nuestro caso, de Postgres en NeonDB. Drizzle ORM soporta diferentes tipos de bases de datos, en caso de usar otro tipo de base de datos al anterior, podemos ver la [documentación al respecto](https://orm.drizzle.team/docs/get-started).

Una vez lista toda las variables de entorno, procederemos a crear las tablas y a poblar la base de datos.

```bash
pnpm drizzle-kit migrate

pnpm tsx /frontend/app/utils/mockup-data.ts
```

## Caso de uso - Demo

> Esto es un caso inventado, cualquier similitud con la realidad es pura casualidad.

El instituto IES l'Estació, con la renovación de su edificio, esta buscando un software TPV para la gestión de su cafetería. En esta demo, mostramos el funcionamiento de un TPV para una cafetería desde la creación de tickets, cierres de caja diarios y diferentes interfaces según rol del usuario (administrador/usuario_normal).

![Imagen interfaz TPV](/docs/img/tpv.png)

## Roadmap - Listado de cosas por hacer

- [x] Crear estructura de la base de datos:
  - [x] users
  - [x] categories
  - [x] articles
  - [x] receipts-numbers
  - [x] receipts-lines
  - [x] receipts
  - [x] end-days
  - [x] payment-methods
- [ ] Crear endpoints:
  - [x] /
  - [x] /login
  - [x] /pos
  - [x] /style-guide
  - [ ] /dashboard
    - [x] /home
    - [x] /receipts
    - [x] /end-day
    - [ ] /maintance
      - [x] /articles
        - create
        - update
        - delete
      - [ ] /categories
        - create
        - update
      - [x] /users
        - create
        - update
        - delete
      - [ ] /payment_methods
        - create
        - update
        - delete
- [x] Implementación funciones TPV:
  - [x] Selector de categorías
  - [x] Selector de artículos
  - [x] Tabla de líneas del ticket
    - [x] Botón para cambiar cantidad de la línea del ticket seleccionado
    - [x] Botón para cambiar precio de la línea del ticket seleccionado
    - [x] Botón para añadir/modificar/eliminar detalles en la línea del ticket seleccionado
      - [ ] EXTRA TODO: Crear menú para añadir suplementos
    - [x] Botón para eliminar línea del ticket
  - [x] Botón finalizar ticket
    - [x] Implementar selector de método de pago
    - [ ] EXTRA TODO: Marcar casilla para imprimir ticket físico y abrir cajón portamonedas.
    - [ ] EXTRA TODO: Incorporar form para buscar por número de NIA del alumno su email (_hipotético caso de acceso api datos de alumno_) y así poder enviar el ticket por email
  - [ ] EXTRA TODO: Botón impresión de ticket actual
  - [ ] EXTRA TODO: Botón apertura cajón portamonedas para cambio
- [x] Implementar autenticación
- [x] Implementar modo oscuro
- [x] Implementar roles de usuario
  - [x] Interfaz de aplicación diferente según rol del usuario
  - [x] Rutas accesibles según rol del usuario
- [x] Implementar visionado de datos y estadísticas
  - [x] Contador de elementos
  - [x] Gráfica de ingresos por meses
  - [x] Listado de últimos tickets
  - [x] Gráficas de tarta con filtros de la facturación por método de pago y por usuario
- [x] Crear una guía de estilo para mostrar desde el endpoint /style-guide
- [ ] Hacer toda la interfaz de la aplicación mobile responsive
