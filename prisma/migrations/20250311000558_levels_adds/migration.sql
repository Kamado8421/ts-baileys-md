/*
  Warnings:

  - You are about to drop the column `level` on the `Users` table. All the data in the column will be lost.
  - Added the required column `levelId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Levels" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "minXp" INTEGER NOT NULL,
    "maxXp" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "jid" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL DEFAULT 'Anônimo(a)',
    "levelId" TEXT NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 5,
    "usedTotalCommans" INTEGER NOT NULL DEFAULT 0,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Users_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Users" ("isBanned", "isPremium", "jid", "usedTotalCommans", "username") SELECT "isBanned", "isPremium", "jid", "usedTotalCommans", "username" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Levels_name_key" ON "Levels"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Levels_minXp_key" ON "Levels"("minXp");

-- CreateIndex
CREATE UNIQUE INDEX "Levels_maxXp_key" ON "Levels"("maxXp");
