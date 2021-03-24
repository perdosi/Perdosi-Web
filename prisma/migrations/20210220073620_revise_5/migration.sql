/*
  Warnings:

  - You are about to drop the column `is_group` on the `Pricing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pricing" DROP COLUMN "is_group",
ADD COLUMN     "total_member" INTEGER NOT NULL DEFAULT 1;
