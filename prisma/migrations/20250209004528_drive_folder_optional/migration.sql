/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.
  - Made the column `accountId` on table `Folder` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_accountId_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "folderId" TEXT;

-- AlterTable
ALTER TABLE "Folder" ALTER COLUMN "accountId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Folder_accountId_key" ON "Folder"("accountId");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
