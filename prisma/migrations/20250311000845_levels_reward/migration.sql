-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Levels" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "minXp" INTEGER NOT NULL,
    "maxXp" INTEGER NOT NULL,
    "reward" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Levels" ("id", "maxXp", "minXp", "name") SELECT "id", "maxXp", "minXp", "name" FROM "Levels";
DROP TABLE "Levels";
ALTER TABLE "new_Levels" RENAME TO "Levels";
CREATE UNIQUE INDEX "Levels_name_key" ON "Levels"("name");
CREATE UNIQUE INDEX "Levels_minXp_key" ON "Levels"("minXp");
CREATE UNIQUE INDEX "Levels_maxXp_key" ON "Levels"("maxXp");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
