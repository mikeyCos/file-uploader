/*
  Warnings:

  - You are about to drop the column `subFolderId` on the `Folder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[parentFolderId]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_subFolderId_fkey";

-- DropIndex
DROP INDEX "Folder_subFolderId_key";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "subFolderId",
ADD COLUMN     "parentFolderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Folder_parentFolderId_key" ON "Folder"("parentFolderId");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_parentFolderId_fkey" FOREIGN KEY ("parentFolderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
