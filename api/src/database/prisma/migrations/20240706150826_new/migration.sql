-- CreateTable
CREATE TABLE "Proof" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "CompalintId" INTEGER NOT NULL,

    CONSTRAINT "Proof_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "CompalintId" INTEGER NOT NULL,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Proof" ADD CONSTRAINT "Proof_CompalintId_fkey" FOREIGN KEY ("CompalintId") REFERENCES "Complaint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_CompalintId_fkey" FOREIGN KEY ("CompalintId") REFERENCES "Complaint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
