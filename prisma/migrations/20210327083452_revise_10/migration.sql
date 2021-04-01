/*
  Warnings:

  - You are about to drop the column `quiz_id` on the `quiz_answers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "quiz_answers" DROP CONSTRAINT "quiz_answers_quiz_id_fkey";

-- AlterTable
ALTER TABLE "quiz_answers" DROP COLUMN "quiz_id",
ADD COLUMN     "quiz_question_id" TEXT,
ADD COLUMN     "quizId" TEXT;

-- AddForeignKey
ALTER TABLE "quiz_answers" ADD FOREIGN KEY ("quiz_question_id") REFERENCES "quiz_questions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_answers" ADD FOREIGN KEY ("quizId") REFERENCES "quizes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
