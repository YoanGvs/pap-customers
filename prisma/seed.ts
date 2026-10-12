import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import { databaseUrl } from "../src/lib/database-url";
import customers from "./data/customers.json";
import orders from "./data/orders.json";

const prisma = new PrismaClient({ adapter: new PrismaBetterSqlite3({ url: databaseUrl }) });

async function main() {
  // Clients d'abord, les commandes en dépendent. update vide = ne touche pas à l'existant
  await prisma.$transaction(async (database) => {
    for (const customer of customers) {
      await database.customer.upsert({ where: { id: customer.id }, create: customer, update: {} });
    }
    for (const order of orders) {
      await database.order.upsert({ where: { id: order.id }, create: order, update: {} });
    }
  });
  console.log("Exemples ajoutés : clients et commandes sont prêts.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
