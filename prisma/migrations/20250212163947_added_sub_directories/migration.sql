/*
  Warnings:

  - A unique constraint covering the columns `[parentDirId]` on the table `Directory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Directory" ADD COLUMN     "name" TEXT,
ADD COLUMN     "parentDirId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Directory_parentDirId_key" ON "Directory"("parentDirId");

-- AddForeignKey
ALTER TABLE "Directory" ADD CONSTRAINT "Directory_parentDirId_fkey" FOREIGN KEY ("parentDirId") REFERENCES "Directory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
