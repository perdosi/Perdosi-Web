/*
  Warnings:

  - You are about to drop the `user_groups` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "groupId" TEXT;

-- DropTable
DROP TABLE "user_groups";

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
