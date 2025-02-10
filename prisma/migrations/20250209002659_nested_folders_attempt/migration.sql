/*
  Warnings:

  - You are about to drop the column `accountId` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subFolderId]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "accountId";

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "subFolderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Folder_subFolderId_key" ON "Folder"("subFolderId");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_subFolderId_fkey" FOREIGN KEY ("subFolderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
