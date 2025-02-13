/*
  Warnings:

  - You are about to drop the `Directory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Directory" DROP CONSTRAINT "Directory_parentDirectoryId_fkey";

-- DropForeignKey
ALTER TABLE "Directory" DROP CONSTRAINT "Directory_userId_fkey";

-- DropTable
DROP TABLE "Directory";

-- DropTable
DROP TABLE "User";
