-- CreateTable
CREATE TABLE "FollowUp" (
    "customerId" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "note" TEXT,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FollowUp_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
