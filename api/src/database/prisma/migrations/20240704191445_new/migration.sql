/*
  Warnings:

  - The values [CANCELED] on the enum `ComplaintStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ComplaintStatus_new" AS ENUM ('OPEN', 'IN_PROGRESS', 'CLOSED', 'REJECTED');
ALTER TABLE "Complaint" ALTER COLUMN "status" TYPE "ComplaintStatus_new" USING ("status"::text::"ComplaintStatus_new");
ALTER TYPE "ComplaintStatus" RENAME TO "ComplaintStatus_old";
ALTER TYPE "ComplaintStatus_new" RENAME TO "ComplaintStatus";
DROP TYPE "ComplaintStatus_old";
COMMIT;
