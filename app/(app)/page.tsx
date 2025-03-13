import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SummaryCards from "./_components/summary-cards";
import TimeSelected from "./_components/date-selected";
import TransactionPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";

interface SearchParams {
  initDate?: string;
  endDate?: string;
}

interface Props {
  searchParams: SearchParams;
}

const home = async ({ searchParams }: Props) => {
  const { initDate, endDate } = searchParams;

  const parseDate = (dateString?: string): Date | null => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split("-").map(Number);
    if (!day || !month || !year) return null;
    const date = new Date(year, month - 1, day); // month é zero-based

    return isNaN(date.getTime()) ? null : date;
  };

  const startDate = parseDate(initDate) || new Date();
  const finalDate = parseDate(endDate) || new Date();

  if (!startDate || !finalDate) {
    console.error("Erro ao processar as datas:", { startDate, finalDate });
  }

  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }

  const dashboardData = await getDashboard({
    startDate: startDate.toISOString(),
    finalDate: finalDate.toISOString(),
  });

  return (
    <main className="container">
      <TimeSelected />
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-3">
          <SummaryCards {...dashboardData} />

          <div className="mt-6 grid grid-cols-3 gap-6">
            <div className="col-span-1">
              <TransactionPieChart
                depositsTotal={dashboardData.depositsTotal}
                expensesTotal={dashboardData.expensesTotal}
                investimentsTotal={dashboardData.investimensTotal}
                typesPercentage={dashboardData.typesPercentage}
              />
            </div>
            <div className="col-span-2">
              <ExpensesPerCategory
                expensesPerCategory={dashboardData.totalExpensePerCategory}
              />
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <LastTransactions lastTranactions={dashboardData.lastTransactions} />
        </div>
      </div>
    </main>
  );
};

export default home;
