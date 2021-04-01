/*
  Warnings:

  - You are about to drop the column `quizId` on the `quiz_answers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "quiz_answers" DROP CONSTRAINT "quiz_answers_quizId_fkey";

-- AlterTable
ALTER TABLE "quiz_answers" DROP COLUMN "quizId";
