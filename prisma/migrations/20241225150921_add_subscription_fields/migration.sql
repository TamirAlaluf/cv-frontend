-- AlterTable
ALTER TABLE "User" ADD COLUMN     "max_usage" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "subscription_tier" TEXT;
