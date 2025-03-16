"use client";

import * as React from "react";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/app/_lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { ptBR } from "date-fns/locale";

import { useQueryState } from "nuqs";
import { useEffect } from "react";

const TimeSelected = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  const [, setDateInit] = useQueryState("initDate", {
    defaultValue: "",
  });

  const [, setDateEnd] = useQueryState("endDate", {
    defaultValue: "",
  });

  const handleDate = (date: DateRange | undefined) => {
    if (!date) return;
    setDate(date);
    if (date.from) {
      setDateInit(format(date.from, "yyyy-MM-dd"));
    }
    if (date.to) {
      setDateEnd(format(date.to, "yyyy-MM-dd"));
    }
  };

  useEffect(() => {
    if (!date) return;

    if (date.from) {
      setDateInit(format(date.from, "dd-MM-yyyy"));
    }
    if (date.to) {
      setDateEnd(format(date.to, "dd-MM-yyyy"));
    }
  }, [date, setDateInit, setDateEnd]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDate}
            numberOfMonths={2}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimeSelected;
