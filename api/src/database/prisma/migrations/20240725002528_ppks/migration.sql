/*
  Warnings:

  - You are about to alter the column `phone` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(13)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(13);
