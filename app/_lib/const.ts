import {
  TransactionCategoryType,
  TransactionPaymentType,
  TransactionType,
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

export const TRANSACTIONS_TYPE_OPTIONS = [
  {
    value: TransactionType.EXPENSE,
    label: "Despesa",
  },
  {
    value: TransactionType.DEPOSIT,
    label: "Receita",
  },
  {
    value: TransactionType.INVESTMENT,
    label: "Investimento",
  },
];

export const TRANSACTIONS_CATEGORIES_TYPE_OPTIONS = [
  {
    value: TransactionCategoryType.EDUCATION,
    label: "Educação",
  },
  {
    value: TransactionCategoryType.ENTERTAINMENT,
    label: "Entretenimento",
  },
  {
    value: TransactionCategoryType.FOOD,
    label: "Alimentação",
  },
  {
    value: TransactionCategoryType.HEALTH,
    label: "Saúde",
  },
  {
    value: TransactionCategoryType.HOUSING,
    label: "Moradia",
  },
  {
    value: TransactionCategoryType.SALARY,
    label: "Salário",
  },
  {
    value: TransactionCategoryType.TRANSPORTATION,
    label: "Transporte",
  },
  {
    value: TransactionCategoryType.ULTILITY,
    label: "Utilidades",
  },
  {
    value: TransactionCategoryType.OTHER,
    label: "Outros",
  },
];

export const PAYMENT_METHOD_TYPE_OPTIONS = [
  {
    value: TransactionPaymentType.BANK_SLIP,
    label: "Boleto",
  },
  {
    value: TransactionPaymentType.BANK_TRANSFER,
    label: "Transferência Bancária",
  },
  {
    value: TransactionPaymentType.CASH,
    label: "Dinheiro",
  },
  {
    value: TransactionPaymentType.CREDIT_CARD,
    label: "Cartão de Crédito",
  },
  {
    value: TransactionPaymentType.DEBIT_CARD,
    label: "Cartão de Débito",
  },
  {
    value: TransactionPaymentType.PIX,
    label: "PIX",
  },
  {
    value: TransactionPaymentType.OTHER,
    label: "Outros",
  },
];
