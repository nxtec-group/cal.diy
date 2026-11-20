#!/bin/sh
# NXTEC: cualquier fallo (BD que no llega, migración rota) para el arranque y deja el contenedor no sano.
set -eu
set -x

# Replace the statically built BUILT_NEXT_PUBLIC_WEBAPP_URL with run-time NEXT_PUBLIC_WEBAPP_URL
# NOTE: if these values are the same, this will be skipped.
scripts/replace-placeholder.sh "$BUILT_NEXT_PUBLIC_WEBAPP_URL" "$NEXT_PUBLIC_WEBAPP_URL"

# wait-for-it.sh es la versión sh de Eficode y no tiene --strict: al vencer el plazo sale con 1
# sin ejecutar la orden, y set -e para el arranque. DATABASE_HOST es obligatoria (set -u).
scripts/wait-for-it.sh "${DATABASE_HOST}" --timeout=120 -- echo "database is up"
npx prisma migrate deploy --schema /calcom/packages/prisma/schema.prisma
npx ts-node --transpile-only /calcom/scripts/seed-app-store.ts
yarn start
