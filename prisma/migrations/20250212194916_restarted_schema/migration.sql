/*
  Warnings:

  - You are about to drop the column `accountId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `folderId` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_accountId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_accountId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "accountId",
DROP COLUMN "folderId";

-- CreateIndex
CREATE UNIQUE INDEX "Folder_accountId_key" ON "Folder"("accountId");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
