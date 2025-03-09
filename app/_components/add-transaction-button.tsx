"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TransactionCategoryType,
  TransactionPaymentType,
  TransactionType,
} from "@prisma/client";
import { MoneyInput } from "./money-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  PAYMENT_METHOD_TYPE_OPTIONS,
  TRANSACTIONS_CATEGORIES_TYPE_OPTIONS,
  TRANSACTIONS_TYPE_OPTIONS,
} from "../_lib/const";
import DatePicker from "./date-picker";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { addTransactions } from "../_actions/transactions/add-transactions";
const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, {
      message: "O nome deve ter no mínimo 2 caracteres",
    })
    .max(50, {
      message: "O nome deve ter no máximo 50 caracteres",
    }),

  amount: z.number(),
  type: z.nativeEnum(TransactionType, {
    required_error: "Selecione o tipo da transação",
  }),
  category: z.nativeEnum(TransactionCategoryType, {
    required_error: "Selecione a categoria da transação",
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentType, {
    required_error: "Selecione o método de pagamento da transação",
  }),
  date: z.date({
    required_error: "Selecione a data da transação",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const AddTransactionButton = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
      type: TransactionType.EXPENSE,
      category: TransactionCategoryType.OTHER,
      paymentMethod: TransactionPaymentType.OTHER,
      date: new Date(),
    },
  });

  const {
    mutateAsync: mutationAddTransactions,
    isPending: isPendingAddTransactions,
  } = useMutation({
    mutationFn: addTransactions,
    onError: (error) => {
      toast("Erro na transação.", {
        description: error.message,
      });
    },
    onSuccess: () => {
      toast("Transação adicionada com sucesso.");
      form.reset();
    },
  });

  const handleSubmit = async (data: FormValues) => {
    await mutationAddTransactions(data);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Adicionar Transação</DialogTitle>
        <DialogDescription>
          Preencha o formulário abaixo para adicionar uma nova transação.
        </DialogDescription>
      </DialogHeader>

      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Nome da transação, por exemplo: &quot;Salário&quot;
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                      value={field.value}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo da transação" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTIONS_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTIONS_CATEGORIES_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um metodo de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PAYMENT_METHOD_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data da transação</FormLabel>

                  <DatePicker value={field.value} onChange={field.onChange} />

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  disabled={isPendingAddTransactions}
                  onClick={() => {
                    form.reset();
                  }}
                  variant="outline"
                  type="button"
                >
                  Cancelar
                </Button>
              </DialogClose>

              <Button disabled={isPendingAddTransactions} type="submit">
                Adicionar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};

export default AddTransactionButton;
