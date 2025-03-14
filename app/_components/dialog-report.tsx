"use client";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { generateIaReport } from "../(app)/_actions/generate-ia-report";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

import Markdown from "react-markdown";
import { Loader2Icon } from "lucide-react";

interface DialogReportProps {
  date: Date;
}

const DialogReport = ({ date }: DialogReportProps) => {
  const [report, setReport] = useState<string | undefined>();
  const [reportLoading, setReportLoading] = useState(false);
  const handleGenerateReportClick = async () => {
    setReportLoading(true);
    try {
      const reportIA = await generateIaReport({ date });
      setReport(reportIA ?? "Erro ao gerar relatório");
    } catch (error) {
      console.error(error);
    } finally {
      setReportLoading(false);
    }
  };
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Relatorio inteligente</DialogTitle>
        <DialogDescription>
          O relatório inteligente é uma ferramenta que te ajuda a entender
          melhor suas transações e a tomar decisões mais assertivas.
        </DialogDescription>
      </DialogHeader>

      <ScrollArea className="prose max-h-[400px] w-full px-5 text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
        {reportLoading ? <p>Carregando...</p> : <Markdown>{report}</Markdown>}
      </ScrollArea>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Fechar</Button>
        </DialogClose>

        <Button disabled={reportLoading} onClick={handleGenerateReportClick}>
          {reportLoading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Gerar relatório"
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DialogReport;
