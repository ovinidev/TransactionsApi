-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "session_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_session_id_key" ON "Transaction"("session_id");
