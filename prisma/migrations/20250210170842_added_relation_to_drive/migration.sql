/*
  Warnings:

  - A unique constraint covering the columns `[folderId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `folderId` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_accountId_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "folderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_folderId_key" ON "Account"("folderId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
