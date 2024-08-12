/*
  Warnings:

  - You are about to alter the column `name` on the `Complaint` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `major` on the `Complaint` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `program` on the `Complaint` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `position` on the `Complaint` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `contact` on the `Complaint` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(14)`.
  - You are about to drop the column `chronology` on the `Proof` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE "Complaint" ALTER COLUMN "name" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "major" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "program" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "position" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "contact" SET DATA TYPE VARCHAR(14);

-- AlterTable
ALTER TABLE "Proof" DROP COLUMN "chronology";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(14);
