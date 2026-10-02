import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import { databaseUrl } from "../src/lib/database-url";

const prisma = new PrismaClient({ adapter: new PrismaBetterSqlite3({ url: databaseUrl }) });

// Ouvrir SQLite crée le fichier s'il manque, sans effacer une base existante.
// Le moteur de migration utilisé ici échoue quand ce fichier n'existe pas encore.
prisma.$queryRaw`SELECT 1`
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
