-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "department" TEXT,
    "since" TEXT,
    "contact" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT
);
INSERT INTO "new_Customer" ("address", "city", "contact", "department", "email", "id", "name", "phone", "since", "type") SELECT "address", "city", "contact", "department", "email", "id", "name", "phone", "since", "type" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
