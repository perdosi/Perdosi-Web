/*
  Warnings:

  - You are about to drop the column `user_id` on the `question_boxes` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "question_boxes.user_id_unique";

-- DropForeignKey
ALTER TABLE "question_boxes" DROP CONSTRAINT "question_boxes_user_id_fkey";

-- AlterTable
ALTER TABLE "question_boxes" DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "_QuestionBoxToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionBoxToUser_AB_unique" ON "_QuestionBoxToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionBoxToUser_B_index" ON "_QuestionBoxToUser"("B");

-- AddForeignKey
ALTER TABLE "_QuestionBoxToUser" ADD FOREIGN KEY ("A") REFERENCES "question_boxes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionBoxToUser" ADD FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
