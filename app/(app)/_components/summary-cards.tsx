import { Badge } from "@/app/_components/ui/badge";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  balance: number;
  investimensTotal: number;
  depositsTotal: number;
  expensesTotal: number;
}

const SummaryCards = async ({
  balance,
  depositsTotal,
  expensesTotal,
  investimensTotal,
}: SummaryCardsProps) => {
  return (
    <div className="space-y-6">
      <SummaryCard
        size="large"
        icon={
          <Badge className="size-10 bg-primary/30 hover:bg-primary/30">
            <WalletIcon size={16} className="text-primary" />
          </Badge>
        }
        title="Saldo"
        amount={balance}
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={
            <Badge className="size-10 bg-foreground/30 hover:bg-foreground/30">
              <PiggyBankIcon className="text-muted-foreground" size={16} />
            </Badge>
          }
          title="Investido"
          amount={investimensTotal}
        />

        <SummaryCard
          icon={
            <Badge className="size-10 bg-primary/30 hover:bg-primary/30">
              <TrendingUpIcon className="text-primary" size={14} />
            </Badge>
          }
          title="Receita"
          amount={depositsTotal}
        />

        <SummaryCard
          icon={
            <Badge className="size-10 bg-red-500/30 hover:bg-red-500/30">
              <TrendingDownIcon className="text-red-500" size={14} />
            </Badge>
          }
          title="Despesas"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
