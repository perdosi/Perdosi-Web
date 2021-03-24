/*
  Warnings:

  - You are about to drop the `_QuestionBoxToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `question_boxes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_QuestionBoxToUser" DROP CONSTRAINT "_QuestionBoxToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionBoxToUser" DROP CONSTRAINT "_QuestionBoxToUser_B_fkey";

-- AlterTable
ALTER TABLE "question_boxes" ADD COLUMN     "user_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_QuestionBoxToUser";

-- AddForeignKey
ALTER TABLE "question_boxes" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
