-- CreateTable
CREATE TABLE "Rule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,

    CONSTRAINT "Rule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Applog" (
    "id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "message" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Applog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Applog" ADD CONSTRAINT "Applog_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
