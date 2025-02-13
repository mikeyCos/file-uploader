/*
  Warnings:

  - You are about to drop the column `accountId` on the `File` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_accountId_fkey";

-- DropIndex
DROP INDEX "File_accountId_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "accountId",
ADD COLUMN     "folderId" TEXT;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
