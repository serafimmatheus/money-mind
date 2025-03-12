import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/types";
import { TRANSACTIONS_CATEGORIES_MAP } from "@/app/_lib/const";

interface ExpensesPerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[];
}

const ExpensesPerCategory = ({
  expensesPerCategory,
}: ExpensesPerCategoryProps) => {
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border p-4">
      <CardHeader>
        <CardTitle>Gastos por categoria</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {expensesPerCategory.map((category) => (
          <div className="space-y-2" key={category.category}>
            <div className="flex w-full items-center justify-between">
              <p className="capitalize">
                {TRANSACTIONS_CATEGORIES_MAP[category.category]}
              </p>
              <p>{category.percentageOfTotal}%</p>
            </div>

            <Progress value={category.percentageOfTotal} />
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensesPerCategory;
