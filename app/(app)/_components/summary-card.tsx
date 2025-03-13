import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { formaterCurrentNumber } from "@/app/_lib/formaterCurrentNumber copy";
import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { endOfMonth, startOfMonth } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: ReactNode;
  size?: "small" | "large";
}

const SummaryCard = async ({
  icon,
  title,
  amount,
  size = "small",
}: SummaryCardProps) => {
  const { userId } = auth();

  if (!userId) {
    return <div>Usuário não autenticado</div>;
  }

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
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center space-x-2">
          {icon}
          <p
            className={` ${size === "small" ? "text-muted-foreground" : "text-white/70"} `}
          >
            {title}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex justify-between">
        <p
          className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl"} `}
        >
          {formaterCurrentNumber.format(amount)}
        </p>

        {size === "large" && (
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
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
