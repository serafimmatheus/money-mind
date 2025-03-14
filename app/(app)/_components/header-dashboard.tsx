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
    <div className="mb-5 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="flex items-center gap-4">
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
