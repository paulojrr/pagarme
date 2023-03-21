/*
  Warnings:

  - A unique constraint covering the columns `[payablesId]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payablesId` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "payablesId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "payables" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payables_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transactions_payablesId_key" ON "transactions"("payablesId");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_payablesId_fkey" FOREIGN KEY ("payablesId") REFERENCES "payables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
