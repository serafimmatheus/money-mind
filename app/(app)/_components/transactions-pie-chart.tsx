"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investimentos",
    color: "#ffffff",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#e93030",
  },
} satisfies ChartConfig;

interface TransactionPieChartProps {
  depositsTotal: number;
  expensesTotal: number;
  investimentsTotal: number;
  typesPercentage: TransactionPercentagePerType;
}

const TransactionPieChart = ({
  depositsTotal,
  expensesTotal,
  investimentsTotal,
  typesPercentage,
}: TransactionPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55b02e",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#e93030",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investimentsTotal,
      fill: "#ffffff",
    },
  ];

  return (
    <Card className="flex flex-col py-6">
      <CardContent className="flex-1 gap-4 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUpIcon size={16} className="text-primary" />
              <p className="text-sm text-muted-foreground">Receita</p>
            </div>
            <p className="text-sm font-bold">
              {typesPercentage[TransactionType.DEPOSIT]}%
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingDownIcon size={16} className="text-destructive" />
              <p className="text-sm text-muted-foreground">Despesas</p>
            </div>
            <p className="text-sm font-bold">
              {typesPercentage[TransactionType.EXPENSE]}%
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PiggyBankIcon size={16} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Investimentos</p>
            </div>
            <p className="text-sm font-bold">
              {typesPercentage[TransactionType.INVESTMENT]}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionPieChart;
