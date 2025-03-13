import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

const DialogReport = async () => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Relatorio inteligente</DialogTitle>
        <DialogDescription>
          O relatório inteligente é uma ferramenta que te ajuda a entender
          melhor suas transações e a tomar decisões mais assertivas.
        </DialogDescription>
      </DialogHeader>

      <div></div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Fechar</Button>
        </DialogClose>

        <Button>Gerar relatório</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DialogReport;
