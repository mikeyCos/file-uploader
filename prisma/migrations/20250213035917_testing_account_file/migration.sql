/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "File_accountId_key" ON "File"("accountId");
