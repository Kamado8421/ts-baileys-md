-- CreateTable
CREATE TABLE "Users" (
    "jid" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL DEFAULT 'Anônimo(a)',
    "level" TEXT NOT NULL,
    "usedTotalCommans" INTEGER NOT NULL DEFAULT 0,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "isBanned" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Groups" (
    "jid" TEXT NOT NULL PRIMARY KEY,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "usedTotalCommans" INTEGER NOT NULL DEFAULT 0
);
