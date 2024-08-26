-- AlterTable
ALTER TABLE "Complaint" ADD COLUMN     "email" TEXT,
ADD COLUMN     "incidentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "incidentLocation" TEXT,
ADD COLUMN     "perpetrator" TEXT;
