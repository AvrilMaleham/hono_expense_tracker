import { useExpenses } from "@/hooks/expenses/use-expenses";
import { ExpenseItem } from "./expense-item";
import type { Expense } from "@hono_expense_tracker/schemas";

export function ExpenseList() {
  const { data, isLoading, error } = useExpenses();

  if (isLoading) {
    return (
      <section className="w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-primary to-fuchsia-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">$</span>
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Your Expenses
          </h2>
        </div>
        <div className="text-center py-8">
          <div className="animate-pulse text-muted-foreground">
            Loading expenses...
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-primary to-fuchsia-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">$</span>
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Your Expenses
          </h2>
        </div>
        <div className="text-center py-8">
          <div className="text-destructive">
            {error.message || "Failed to load expenses"}
          </div>
        </div>
      </section>
    );
  }

  if (!data?.expenses || data.expenses.length === 0) {
    return (
      <section className="w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-primary to-fuchsia-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">$</span>
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Your Expenses (0)
          </h2>
        </div>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-muted to-muted/50 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">💸</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No expenses yet
          </h3>
          <p className="text-muted-foreground">
            Add your first expense using the form on the left!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-primary to-fuchsia-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">$</span>
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          Your Expenses ({data.expenses.length})
        </h2>
      </div>
      <div>
        {data.expenses.map((expense: Expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </div>
    </section>
  );
}
