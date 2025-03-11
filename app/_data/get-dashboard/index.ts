import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "./types";

interface GetDashboardProps {
  startDate: string;
  finalDate: string;
}

export const getDashboard = async ({
  finalDate,
  startDate,
}: GetDashboardProps) => {
  const { userId } = auth();

  const where = {
    date: {
      gte: startDate,
      lte: finalDate,
    },
  };

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "DEPOSIT",
          userId,
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount,
  );

  const investimensTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "INVESTMENT",
          userId,
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "EXPENSE",
          userId,
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount,
  );

  const balance = depositsTotal - investimensTotal - expensesTotal;

  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          userId,
        },
        _sum: { amount: true },
      })
    )?._sum.amount,
  );

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investimensTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  return {
    balance,
    depositsTotal,
    expensesTotal,
    investimensTotal,
    typesPercentage,
  };
};
