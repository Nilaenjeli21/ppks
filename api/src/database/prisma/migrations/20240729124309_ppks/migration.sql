/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Complaint` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Complaint" DROP COLUMN "createdAt",
ADD COLUMN     "reportDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
