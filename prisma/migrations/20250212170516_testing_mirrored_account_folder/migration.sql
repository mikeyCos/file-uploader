/*
  Warnings:

  - You are about to drop the column `parentDirId` on the `Directory` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Directory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[parentDirectoryId]` on the table `Directory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[directoryId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Directory` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Directory` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `directoryId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Directory" DROP CONSTRAINT "Directory_parentDirId_fkey";

-- DropForeignKey
ALTER TABLE "Directory" DROP CONSTRAINT "Directory_userId_fkey";

-- AlterTable
ALTER TABLE "Directory" DROP COLUMN "parentDirId",
DROP COLUMN "userId",
ADD COLUMN     "UserId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "parentDirectoryId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'New dir';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "directoryId" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Directory_parentDirectoryId_key" ON "Directory"("parentDirectoryId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_directoryId_key" ON "User"("directoryId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_directoryId_fkey" FOREIGN KEY ("directoryId") REFERENCES "Directory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Directory" ADD CONSTRAINT "Directory_parentDirectoryId_fkey" FOREIGN KEY ("parentDirectoryId") REFERENCES "Directory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
