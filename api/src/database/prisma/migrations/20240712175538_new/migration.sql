/*
  Warnings:

  - Added the required column `originalName` to the `Recommendation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recommendation" ADD COLUMN     "originalName" TEXT NOT NULL;
