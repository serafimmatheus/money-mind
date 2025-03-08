/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getRandomElement = (arr: any) =>
  arr[Math.floor(Math.random() * arr.length)];
const randomAmount = () => (Math.random() * (5000 - 10) + 10).toFixed(2);

const transactionTypes = ["DEPOSIT", "EXPENSE", "INVESTMENT"];
const categoryTypes = [
  "HOUSING",
  "TRANSPORTATION",
  "FOOD",
  "ENTERTAINMENT",
  "HEALTH",
  "ULTILITY",
  "SALARY",
  "EDUCATION",
  "OTHER",
];
const paymentMethods = [
  "CREDIT_CARD",
  "DEBIT_CARD",
  "BANK_TRANSFER",
  "BANK_SLIP",
  "CASH",
  "PIX",
  "OTHER",
];

const generateRandomDate = (month: number, year: number) => {
  const day = Math.floor(Math.random() * 28) + 1; // Garantindo um dia válido
  return new Date(year, month - 1, day);
};

const generateTransactions = (count: any, month: any, year: any) => {
  return Array.from({ length: count }, () => ({
    name: `Transaction ${Math.random().toString(36).substring(7)}`,
    type: getRandomElement(transactionTypes),
    amount: parseFloat(randomAmount()),
    category: getRandomElement(categoryTypes),
    paymentMethod: getRandomElement(paymentMethods),
    date: generateRandomDate(month, year),
  }));
};

async function main() {
  const transactions = [
    ...generateTransactions(40, 1, 2025), // Janeiro 2025
    ...generateTransactions(110, 2, 2025), // Fevereiro 2025
  ];

  await prisma.transaction.createMany({
    data: transactions,
  });

  console.log("Seeded 150 transactions!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
