import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Separator } from "@/app/_components/ui/separator";
import { formaterCurrentDate } from "@/app/_lib/formaterCurrentDate";
import { formaterCurrentNumber } from "@/app/_lib/formaterCurrentNumber copy";
import { Transaction, TransactionType } from "@prisma/client";
import Link from "next/link";

interface LastTransactionsProps {
  lastTranactions: Transaction[];
}

const LastTransactions = ({ lastTranactions }: LastTransactionsProps) => {
  const getPriceColor = (transaction: Transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return "text-green-500";
    }

    if (transaction.type === TransactionType.EXPENSE) {
      return "text-red-500";
    }

    if (transaction.type === TransactionType.INVESTMENT) {
      return "text-blue-500";
    }

    return "text-gray-500";
  };
  return (
    <ScrollArea className="h-full rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Últimas transações</CardTitle>

        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href="/transacoes">Ver todas</Link>
        </Button>
      </CardHeader>

      <Separator />

      <CardContent>
        {lastTranactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between border-b py-2 last:border-0"
          >
            <div>
              <p className="font-bold">{transaction.name}</p>
              <p className="text-xs text-gray-500">
                {formaterCurrentDate.format(transaction.date)}
              </p>
            </div>

            <p className={`font-bold ${getPriceColor(transaction)}`}>
              {transaction.type === TransactionType.EXPENSE && "-"}
              {transaction.type === TransactionType.DEPOSIT && "+"}
              {formaterCurrentNumber.format(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
