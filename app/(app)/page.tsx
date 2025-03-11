import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SummaryCards from "./_components/summary-cards";
import TimeSelected from "./_components/date-selected";
import { db } from "../_lib/prisma";

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

  const where = {
    date: {
      gte: startDate,
      lte: finalDate,
    },
  };

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "DEPOSIT",
          userId,
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount,
  );

  const investimensTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "INVESTMENT",
          userId,
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "EXPENSE",
          userId,
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount,
  );

  const balance = depositsTotal - investimensTotal - expensesTotal;

  return (
    <main className="container">
      <TimeSelected />
      <div className="grid grid-cols-5">
        <div className="col-span-3">
          <SummaryCards
            balance={balance}
            depositsTotal={depositsTotal}
            expensesTotal={expensesTotal}
            investimensTotal={investimensTotal}
          />
        </div>
        <div className="col-span-2"></div>
      </div>
    </main>
  );
};

export default home;
