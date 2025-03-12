import { TransactionCategoryType, TransactionType } from "@prisma/client";

export type TransactionPercentagePerType = {
  [key in TransactionType]: number;
};

export interface TotalExpensePerCategory {
  category: TransactionCategoryType;
  totalAmount: number;
  percentageOfTotal: number;
}
