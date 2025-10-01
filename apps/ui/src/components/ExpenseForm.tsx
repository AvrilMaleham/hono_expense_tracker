"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CreateExpenseSchema } from "@hono_expense_tracker/schemas";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateExpense } from "@/hooks/useExpenses";

export function ExpenseForm() {
  const createExpenseMutation = useCreateExpense();

  const form = useForm<z.infer<typeof CreateExpenseSchema>>({
    resolver: zodResolver(CreateExpenseSchema),
    // defaultValues: {
    //  description: string;
    //  amount: number;
    //  category: string;
    //  date: string;
    // },
  });

  function onSubmit(data: z.infer<typeof CreateExpenseSchema>) {
    createExpenseMutation.mutate(data, {
      onSuccess: () => {
        toast("You submitted the following values", {
          description: (
            <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create expense");
      },
    });
  }

  return (
    <>
      {" "}
      <h2>Add New Expense</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>"Description"</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>"Amount"</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>"Category"</FormLabel>
                <FormControl>
                  <Input placeholder="Category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>"Date"</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={createExpenseMutation.isPending}>
            {createExpenseMutation.isPending ? "Adding..." : "Add Expense"}
          </Button>
        </form>
      </Form>
    </>
  );
}
