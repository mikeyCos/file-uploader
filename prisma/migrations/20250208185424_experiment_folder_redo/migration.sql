/*
  Warnings:

  - You are about to drop the column `folderId` on the `Account` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_folderId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "folderId";

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "accountId" TEXT;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
