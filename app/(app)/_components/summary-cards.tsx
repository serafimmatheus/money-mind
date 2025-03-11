import { Card, CardHeader } from "@/app/_components/ui/card";
import { WalletIcon } from "lucide-react";

const SummaryCard = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center space-x-2">
            <WalletIcon size={16} />
            <p className="text-white/70">Saldo</p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default SummaryCard;
