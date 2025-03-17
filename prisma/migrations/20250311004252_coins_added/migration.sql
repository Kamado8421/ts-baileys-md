/*
  Warnings:

  - Added the required column `coins` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
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
    "coins" INTEGER NOT NULL,
    CONSTRAINT "Users_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Users" ("isBanned", "isPremium", "jid", "levelId", "usedTotalCommans", "username", "xp") SELECT "isBanned", "isPremium", "jid", "levelId", "usedTotalCommans", "username", "xp" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
