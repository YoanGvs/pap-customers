import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

test("la base conserve les clients et leurs commandes", { timeout: 120_000 }, async () => {
  const directory = mkdtempSync(join(tmpdir(), "pap-customers-test-"));
  const databaseUrl = `file:${join(directory, "test.db")}`;
  const cwd = fileURLToPath(new URL("../", import.meta.url));
  const connect = () => new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url: databaseUrl }),
  });
  const runCommand = (command: string, args: string[]) => {
    const result = spawnSync(command, args, {
      cwd,
      env: { ...process.env, DATABASE_URL: databaseUrl },
      encoding: "utf8",
      timeout: 60_000,
    });
    assert.ifError(result.error);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  };

  let prisma: PrismaClient | undefined;
  try {
    runCommand("npm", ["run", "db:setup"]);
    prisma = connect();

    assert.equal(await prisma.customer.count(), 9);
    assert.equal(await prisma.order.count(), 4);
    const customer = await prisma.customer.findUnique({
      where: { id: "9" },
      include: { orders: true },
    });
    assert.ok(customer);
    assert.equal(customer.name, "Les Explorateurs");
    assert.equal(customer.orders.length, 4);
    assert.ok(customer.orders.every((order) => order.customerId === "9"));
    assert.equal(await prisma.customer.findUnique({ where: { id: "absent" } }), null);
    assert.equal(await prisma.customer.findUnique({ where: { id: "1abc" } }), null);

    await assert.rejects(prisma.order.create({
      data: {
        id: "commande-invalide",
        reference: "TEST-ABSENT",
        date: "2026-10-02",
        amountCents: 1000,
        status: "Livrée",
        customerId: "absent",
      },
    }), { code: "P2003" });

    const editedName = "Marie — modification conservée";
    await prisma.customer.update({ where: { id: "1" }, data: { name: editedName } });
    runCommand("npx", ["--no-install", "prisma", "db", "seed"]);
    assert.equal(await prisma.customer.count(), 9);
    assert.equal(await prisma.order.count(), 4);
    assert.equal((await prisma.customer.findUnique({ where: { id: "1" } }))?.name, editedName);

    await prisma.$disconnect();
    prisma = connect();
    assert.equal((await prisma.customer.findUnique({ where: { id: "1" } }))?.name, editedName);
    assert.equal(await prisma.order.count(), 4);
  } finally {
    await prisma?.$disconnect();
    // Seul le répertoire temporaire créé par ce test est supprimé.
    rmSync(directory, { recursive: true, force: true });
  }
});
