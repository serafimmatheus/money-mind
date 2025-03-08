import {
  TransactionCategoryType,
  TransactionPaymentType,
} from "@prisma/client";

export const TRANSACTIONS_CATEGORIES_MAP = {
  [TransactionCategoryType.HOUSING]: "Moradia",
  [TransactionCategoryType.FOOD]: "Alimentação",
  [TransactionCategoryType.EDUCATION]: "Educação",
  [TransactionCategoryType.ENTERTAINMENT]: "Entretenimento",
  [TransactionCategoryType.HEALTH]: "Saúde",
  [TransactionCategoryType.SALARY]: "Salário",
  [TransactionCategoryType.TRANSPORTATION]: "Transporte",
  [TransactionCategoryType.ULTILITY]: "Utilidades",
  [TransactionCategoryType.OTHER]: "Outros",
};

export const TRANSACTIONS_PAYMENT_MAP = {
  [TransactionPaymentType.BANK_SLIP]: "Boleto",
  [TransactionPaymentType.BANK_TRANSFER]: "Transferência Bancária",
  [TransactionPaymentType.CASH]: "Dinheiro",
  [TransactionPaymentType.CREDIT_CARD]: "Cartão de Crédito",
  [TransactionPaymentType.DEBIT_CARD]: "Cartão de Débito",
  [TransactionPaymentType.PIX]: "PIX",
  [TransactionPaymentType.OTHER]: "Outros",
};
