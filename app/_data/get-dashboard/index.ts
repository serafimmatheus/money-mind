import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { TransactionType } from "@prisma/client";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";

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

  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        userId,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((item) => ({
    category: item.category,
    totalAmount: Number(item._sum.amount),
    percentageOfTotal: Math.round(
      (Number(item._sum.amount) / expensesTotal) * 100,
    ),
  }));

  const lastTransactions = await db.transaction.findMany({
    where: {
      ...where,
      userId,
    },
    orderBy: {
      date: "desc",
    },
    take: 20,
  });

  return {
    balance,
    depositsTotal,
    expensesTotal,
    investimensTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions,
  };
};
