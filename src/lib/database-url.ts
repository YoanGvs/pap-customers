// DATABASE_URL permet aux tests d'utiliser une base temporaire
export const databaseUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
