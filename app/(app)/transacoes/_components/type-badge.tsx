import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";

interface TypeTransactionBadgeProps {
  transaction: Transaction;
}

const TypeTransactionBadge = ({ transaction }: TypeTransactionBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="flex w-fit items-center gap-1 bg-primary/30 text-primary hover:bg-primary/30">
        <div className="size-2 rounded-full bg-primary" />
        Depósito
      </Badge>
    );
  }

  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="flex w-fit items-center gap-1 bg-destructive/30 text-destructive hover:bg-destructive/30">
        <div className="size-2 rounded-full bg-destructive" />
        Despesa
      </Badge>
    );
  }

  return (
    <Badge className="flex w-fit items-center gap-1 bg-muted/30 text-secondary hover:bg-muted/30">
      <div className="size-2 rounded-full bg-secondary" />
      Investimento
    </Badge>
  );
};

export default TypeTransactionBadge;
