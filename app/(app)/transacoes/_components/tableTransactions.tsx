"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { SquarePen, Trash } from "lucide-react";

import { Button } from "@/app/_components/ui/button";

import { Input } from "@/app/_components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Transaction } from "@prisma/client";
import TypeTransactionBadge from "./type-badge";
import {
  TRANSACTIONS_CATEGORIES_MAP,
  TRANSACTIONS_PAYMENT_MAP,
} from "@/app/_lib/const";
import { formaterCurrentDate } from "@/app/_lib/formaterCurrentDate";
import { formaterCurrentNumber } from "@/app/_lib/formaterCurrentNumber";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import AddTransactionButton from "@/app/_components/add-transaction-button";
import { deleteTransactions } from "@/app/_actions/transactions/delete-transactions";

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => (
      <TypeTransactionBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTIONS_CATEGORIES_MAP[transaction.category],
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTIONS_PAYMENT_MAP[transaction.paymentMethod],
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: (cell) => {
      return (
        <div className="flex items-center space-x-2">
          <span>
            {formaterCurrentDate.format(new Date(cell.row.original.date))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: (cell) => {
      return (
        <div className="flex items-center space-x-2">
          <span>
            {formaterCurrentNumber.format(Number(cell.row.original.amount))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    cell: (cell) => {
      const id = cell.row.original.id;
      return (
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  console.log(`Edit transaction with id ${id}`);
                }}
                variant="outline"
                size="icon"
              >
                <SquarePen />
              </Button>
            </DialogTrigger>

            <AddTransactionButton
              isEditing={true}
              transaction={cell.row.original}
              transactionId={id}
            />
          </Dialog>
          <Button
            onClick={async () => {
              await deleteTransactions(id);
            }}
            variant="outline"
            size="icon"
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];

interface TableTransactionsProps {
  data: Transaction[];
}

export function TableTransactions({ data }: TableTransactionsProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns: transactionsColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar por nome"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={transactionsColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            className="select-none"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            className="select-none"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
