#!/bin/bash

until nc -z database ${DB_PORT}; do
  echo "Esperando conexión con la base de datos..."
  sleep 2
done

#Eliminar estas lineas si no queremos poblar la base de datos
pnpm drizzle-kit migrate
pnpm tsx /frontend/app/utils/mockup-data.ts
#------------------------------------------------------------

pnpm dev