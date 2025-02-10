/*
  Warnings:

  - You are about to drop the column `folderId` on the `Account` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_folderId_fkey";

-- DropIndex
DROP INDEX "Folder_accountId_key";

-- DropIndex
DROP INDEX "Folder_parentFolderId_accountId_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "folderId";

-- AlterTable
ALTER TABLE "Folder" ALTER COLUMN "accountId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
