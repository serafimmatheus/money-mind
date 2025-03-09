"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategoryType,
  TransactionPaymentType,
  TransactionType,
} from "@prisma/client";
import { addTransactionsSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface AddTransactionsParams {
  name: string;
  amount: number;
  date: Date;
  type: TransactionType;
  category: TransactionCategoryType;
  paymentMethod: TransactionPaymentType;
}

export const addTransactions = async (params: AddTransactionsParams) => {
  addTransactionsSchema.parse(params);

  const { userId } = auth();

  if (!userId) {
    throw new Error("Não autorizado");
  }

  await db.transaction.create({
    data: { ...params, userId },
  });

  revalidatePath("/transacoes");
};
