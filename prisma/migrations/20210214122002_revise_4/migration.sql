-- AlterTable
ALTER TABLE "Pricing" ADD COLUMN     "is_group" BOOLEAN NOT NULL DEFAULT false;

-- AlterIndex
ALTER INDEX "profiles_user_id_unique" RENAME TO "profiles.user_id_unique";
