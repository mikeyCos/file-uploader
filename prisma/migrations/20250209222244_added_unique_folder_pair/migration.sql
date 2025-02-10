/*
  Warnings:

  - A unique constraint covering the columns `[parentFolderId]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[parentFolderId,accountId]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Folder_parentFolderId_key" ON "Folder"("parentFolderId");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_parentFolderId_accountId_key" ON "Folder"("parentFolderId", "accountId");
