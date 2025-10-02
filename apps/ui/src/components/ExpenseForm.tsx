import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { CreateExpenseSchema } from "@hono_expense_tracker/schemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateExpense } from "@/hooks/useExpenses";

export function ExpenseForm() {
  const createExpenseMutation = useCreateExpense();

  const form = useForm({
    defaultValues: {
      description: "",
      amount: 0,
      category: "",
      date: "",
    },
    validators: {
      onChange: CreateExpenseSchema,
    },
    onSubmit: ({ value }) => {
      createExpenseMutation.mutate(value, {
        onSuccess: () => {
          toast("You submitted the following values", {
            description: (
              <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                <code className="text-white">
                  {JSON.stringify(value, null, 2)}
                </code>
              </pre>
            ),
          });
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create expense");
        },
      });
    },
  });

  return (
    <section className="mx-auto max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field name="description">
          {(field) => (
            <div className="mb-4">
              <label
                htmlFor={field.name}
                className="text-sm font-semibold text-secondary-foreground"
              >
                Description
              </label>
              <Input
                id={field.name}
                name={field.name}
                placeholder="Description"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors ? (
                <span className="text-destructive">
                  {field.state.meta.errors[0]?.message}
                </span>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Field name="amount">
          {(field) => (
            <div className="mb-4">
              <label
                htmlFor={field.name}
                className="text-sm font-semibold text-secondary-foreground"
              >
                Amount
              </label>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
              {field.state.meta.errors ? (
                <span className="text-destructive">
                  {field.state.meta.errors[0]?.message}
                </span>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Field name="category">
          {(field) => (
            <div className="mb-4">
              <label
                htmlFor={field.name}
                className="text-sm font-semibold text-secondary-foreground"
              >
                Category
              </label>
              <Input
                id={field.name}
                name={field.name}
                placeholder="Category"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors ? (
                <span className="text-destructive">
                  {field.state.meta.errors[0]?.message}
                </span>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Field name="date">
          {(field) => (
            <div className="mb-4">
              <label
                htmlFor={field.name}
                className="text-sm font-semibold text-secondary-foreground"
              >
                Date
              </label>
              <Input
                id={field.name}
                name={field.name}
                type="date"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors ? (
                <span className="text-destructive">
                  {field.state.meta.errors[0]?.message}
                </span>
              ) : null}
            </div>
          )}
        </form.Field>

        <Button type="submit" disabled={createExpenseMutation.isPending}>
          {createExpenseMutation.isPending ? "Adding..." : "Add Expense"}
        </Button>
      </form>
    </section>
  );
}
