-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_accountId_fkey";

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
