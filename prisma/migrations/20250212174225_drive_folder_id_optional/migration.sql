-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_folderId_fkey";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "folderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
