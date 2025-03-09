import {
  TransactionCategoryType,
  TransactionPaymentType,
  TransactionType,
} from "@prisma/client";
import { z } from "zod";

export const addTransactionsSchema = z.object({
  name: z.string().trim().min(2).max(50),

  amount: z.number().positive(),
  type: z.nativeEnum(TransactionType),
  category: z.nativeEnum(TransactionCategoryType),
  paymentMethod: z.nativeEnum(TransactionPaymentType),
  date: z.date(),
});
