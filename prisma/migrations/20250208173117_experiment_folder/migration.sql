/*
  Warnings:

  - You are about to drop the column `createdById` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `parentFolderId` on the `Folder` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_parentFolderId_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "folderId" TEXT;

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "createdById",
DROP COLUMN "parentFolderId";

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
