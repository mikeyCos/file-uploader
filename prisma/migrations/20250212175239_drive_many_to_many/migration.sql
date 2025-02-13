/*
  Warnings:

  - You are about to drop the column `folderId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `parentFolderId` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_folderId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_parentFolderId_fkey";

-- DropIndex
DROP INDEX "Account_folderId_key";

-- DropIndex
DROP INDEX "Folder_parentFolderId_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "folderId";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "parentFolderId";

-- DropTable
DROP TABLE "File";

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
