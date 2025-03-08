import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ArrowUpDown } from "lucide-react";
import { TableTransactions } from "./_components/tableTransactions";
import { auth } from "@clerk/nextjs/server";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import AddTransactionButton from "@/app/_components/add-transaction-button";

const PageTransactions = async () => {
  const { userId } = await auth();
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });
  return (
    <main className="container">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Transações</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full">
              Adicionar Transação
              <ArrowUpDown />
            </Button>
          </DialogTrigger>

          <AddTransactionButton />
        </Dialog>
      </div>

      <TableTransactions data={transactions} />
    </main>
  );
};

export default PageTransactions;
