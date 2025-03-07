-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'EXPENSE', 'INVESTMENT');

-- CreateEnum
CREATE TYPE "TransactionCategoryType" AS ENUM ('HOUSING', 'TRANSPORTATION', 'FOOD', 'ENTERTAINMENT', 'HEALTH', 'ULTILITY', 'SALARY', 'EDUCATION', 'OTHER');

-- CreateEnum
CREATE TYPE "TransactionPaymentType" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'BANK_SLIP', 'CASH', 'PIX', 'OTHER');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "category" "TransactionCategoryType" NOT NULL,
    "paymentMethod" "TransactionPaymentType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
