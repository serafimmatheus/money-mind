import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SummaryCard from "./_components/summary-cards";

const home = () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  return (
    <main className="container">
      <div className="grid grid-cols-5">
        <div className="col-span-3">
          <SummaryCard />
        </div>
        <div className="col-span-2"></div>
      </div>
    </main>
  );
};

export default home;
