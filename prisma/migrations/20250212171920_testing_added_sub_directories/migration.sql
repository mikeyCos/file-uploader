/*
  Warnings:

  - A unique constraint covering the columns `[parentDirectoryId]` on the table `Directory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Directory" ADD COLUMN     "parentDirectoryId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Directory_parentDirectoryId_key" ON "Directory"("parentDirectoryId");

-- AddForeignKey
ALTER TABLE "Directory" ADD CONSTRAINT "Directory_parentDirectoryId_fkey" FOREIGN KEY ("parentDirectoryId") REFERENCES "Directory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
