"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategoryType,
  TransactionPaymentType,
  TransactionType,
} from "@prisma/client";
import { upsertTransactionsSchema } from "./schema";
import { revalidatePath } from "next/cache";

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
