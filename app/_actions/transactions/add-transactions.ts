"use server";

import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import {
  TransactionCategoryType,
  TransactionPaymentType,
  TransactionType,
} from "@prisma/client";
import { upsertTransactionsSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { endOfMonth, startOfMonth } from "date-fns";

interface UpsertTransactionsParams {
  id?: string;
  name: string;
  amount: number;
  date: Date;
  type: TransactionType;
  category: TransactionCategoryType;
  paymentMethod: TransactionPaymentType;
}

export const upsertTransactions = async (params: UpsertTransactionsParams) => {
  upsertTransactionsSchema.parse(params);

  const { userId } = auth();

  if (!userId) {
    throw new Error("Não autorizado");
  }

  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";
  const currentMonthTransaction = await db.transaction.count({
    where: {
      userId: userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  });

  if (currentMonthTransaction >= 10 && !hasPremiumPlan) {
    throw new Error("Limite de transações atingido.");
  }

  await db.transaction.upsert({
    update: params,
    create: {
      ...params,
      userId,
    },
    where: {
      id: params.id ?? "",
    },
  });

  revalidatePath("/transacoes");
};
