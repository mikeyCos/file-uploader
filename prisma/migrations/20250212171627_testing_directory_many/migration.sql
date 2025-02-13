/*
  Warnings:

  - You are about to drop the column `UserId` on the `Directory` table. All the data in the column will be lost.
  - You are about to drop the column `parentDirectoryId` on the `Directory` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Directory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Directory" DROP CONSTRAINT "Directory_parentDirectoryId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_directoryId_fkey";

-- DropIndex
DROP INDEX "Directory_parentDirectoryId_key";

-- AlterTable
ALTER TABLE "Directory" DROP COLUMN "UserId",
DROP COLUMN "parentDirectoryId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Directory" ADD CONSTRAINT "Directory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
