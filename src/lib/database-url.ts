// Même fichier pour la création, le remplissage et les lectures de la base.
// Les tests peuvent choisir une base temporaire via DATABASE_URL.
export const databaseUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
