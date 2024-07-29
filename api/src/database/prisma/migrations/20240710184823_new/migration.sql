/*
  Warnings:

  - You are about to drop the column `CompalintId` on the `Proof` table. All the data in the column will be lost.
  - You are about to drop the column `CompalintId` on the `Recommendation` table. All the data in the column will be lost.
  - Added the required column `ComplaintId` to the `Proof` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ComplaintId` to the `Recommendation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Proof" DROP CONSTRAINT "Proof_CompalintId_fkey";

-- DropForeignKey
ALTER TABLE "Recommendation" DROP CONSTRAINT "Recommendation_CompalintId_fkey";

-- AlterTable
ALTER TABLE "Proof" DROP COLUMN "CompalintId",
ADD COLUMN     "ComplaintId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Recommendation" DROP COLUMN "CompalintId",
ADD COLUMN     "ComplaintId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Proof" ADD CONSTRAINT "Proof_ComplaintId_fkey" FOREIGN KEY ("ComplaintId") REFERENCES "Complaint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_ComplaintId_fkey" FOREIGN KEY ("ComplaintId") REFERENCES "Complaint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
