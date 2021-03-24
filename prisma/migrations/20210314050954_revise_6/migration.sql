-- CreateTable
CREATE TABLE "question_boxes" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "project_id" TEXT NOT NULL DEFAULT E'1',
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "question_boxes.user_id_unique" ON "question_boxes"("user_id");

-- AddForeignKey
ALTER TABLE "question_boxes" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
