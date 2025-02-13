/*
  Warnings:

  - You are about to drop the column `directoryId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_directoryId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "directoryId";
