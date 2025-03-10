"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deleteTransactions = async (id: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Não autorizado");
  }

  const findTransaction = await db.transaction.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!findTransaction) {
    throw new Error("Transação não encontrada");
  }

  await db.transaction.delete({
    where: {
      id,
    },
  });

  revalidatePath("/transacoes");
};
