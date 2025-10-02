import { useExpenses } from "../hooks/useExpenses";
import { ExpenseItem } from "./ExpenseItem";
import type { Expense } from "@hono_expense_tracker/schemas";

export function ExpenseList() {
  const { data, isLoading, error } = useExpenses();

  if (isLoading) {
    return <div>Loading expenses...</div>;
  }

  if (error) {
    return <div>{error.message || "Failed to load expenses"}</div>;
  }

  if (!data?.expenses || data.expenses.length === 0) {
    return <div>No expenses found. Add one above!</div>;
  }

  return (
    <section className="mx-auto max-w-xl w-full my-8">
      <h2 className="text-lg font-semibold mb-4">
        Your Expenses ({data.expenses.length})
      </h2>
      <div>
        {data.expenses.map((expense: Expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </div>
    </section>
  );
}
