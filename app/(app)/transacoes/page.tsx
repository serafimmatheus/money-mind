import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ArrowUpDown } from "lucide-react";
import { TableTransactions } from "./_components/tableTransactions";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import AddTransactionButton from "@/app/_components/add-transaction-button";
import { endOfMonth, startOfMonth } from "date-fns";

const PageTransactions = async () => {
  const { userId } = auth();

  if (!userId) {
    return <div>Usuário não autenticado</div>;
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });

  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";
  const currentMonthTransaction = await db.transaction.count({
    where: {
      userId: userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  });

  const handleAcquirePlanClick = () => {
    if (hasPremiumPlan) {
      return true;
    }

    if (currentMonthTransaction >= 10) {
      return false;
    }

    return false;
  };
  return (
    <div className="container">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Transações</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full">
              Adicionar Transação
              <ArrowUpDown />
            </Button>
          </DialogTrigger>

          <AddTransactionButton
            userCanAddTransaction={!!handleAcquirePlanClick}
          />
        </Dialog>
      </div>

      <TableTransactions data={transactions} />
    </div>
  );
};

export default PageTransactions;
