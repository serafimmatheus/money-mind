import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { formaterCurrentNumber } from "@/app/_lib/formaterCurrentNumber";
import { auth } from "@clerk/nextjs/server";
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
          className={`font-bold ${size === "small" ? "text-xl sm:text-2xl" : "text-2xl sm:text-4xl"} `}
        >
          {formaterCurrentNumber.format(amount)}
        </p>

        {size === "large" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full">
                <p className="hidden sm:block">Adicionar Transação</p>
                <ArrowUpDown />
              </Button>
            </DialogTrigger>

            <AddTransactionButton />
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
