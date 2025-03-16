import DialogReport from "@/app/_components/dialog-report";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { ClipboardMinusIcon } from "lucide-react";
import TimeSelected from "./date-selected";

interface HeaderDashboardProps {
  startDate: Date;
}

const HeaderDashboard = ({ startDate }: HeaderDashboardProps) => {
  return (
    <div className="mb-5 flex flex-col items-center justify-between gap-3 sm:flex-row">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              Relatório com IA
              <ClipboardMinusIcon className="ml-1" />
            </Button>
          </DialogTrigger>

          <DialogReport date={startDate} />
        </Dialog>

        <TimeSelected />
      </div>
    </div>
  );
};

export default HeaderDashboard;
