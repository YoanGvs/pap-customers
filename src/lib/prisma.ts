import "server-only";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";
import { databaseUrl } from "@/lib/database-url";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Réutiliser la connexion quand Next recharge le code pendant le développement.
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: databaseUrl }),
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
