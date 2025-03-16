import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SummaryCards from "./_components/summary-cards";
import TransactionPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import HeaderDashboard from "./_components/header-dashboard";
import { endOfMonth, startOfMonth } from "date-fns";

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
    const date = new Date(year, month - 1, day);

    return isNaN(date.getTime()) ? null : date;
  };

  const startDate = parseDate(initDate) || startOfMonth(new Date());
  const finalDate = parseDate(endDate) || endOfMonth(new Date());

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
    <div className="container pb-20">
      <HeaderDashboard startDate={startDate} />
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-5 lg:col-span-3">
          <SummaryCards {...dashboardData} />

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="col-span-3 md:col-span-1">
              <TransactionPieChart
                depositsTotal={dashboardData.depositsTotal}
                expensesTotal={dashboardData.expensesTotal}
                investimentsTotal={dashboardData.investimensTotal}
                typesPercentage={dashboardData.typesPercentage}
              />
            </div>
            <div className="col-span-3 md:col-span-2">
              <ExpensesPerCategory
                expensesPerCategory={dashboardData.totalExpensePerCategory}
              />
            </div>
          </div>
        </div>

        <div className="col-span-2 hidden lg:block">
          <LastTransactions lastTranactions={dashboardData.lastTransactions} />
        </div>
      </div>
    </div>
  );
};

export default home;
