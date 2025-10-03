import { useExpenses } from "@/hooks/expenses/use-expenses";
import { ExpenseItem } from "./expense-item";
import type { Expense } from "@hono_expense_tracker/schemas";
import { List } from "lucide-react";

export function ExpenseList() {
  const { data, isLoading, error } = useExpenses();

  const getExpenseCount = () => {
    if (isLoading || error) return "";
    return data?.expenses ? `(${data.expenses.length})` : "(0)";
  };

  const getContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-8">
          <div className="animate-pulse text-muted-foreground">
            Loading expenses...
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8">
          <div className="text-destructive">
            {error.message || "Failed to load expenses"}
          </div>
        </div>
      );
    }

    if (!data?.expenses || data.expenses.length === 0) {
      return (
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
      );
    }

    return (
      <div>
        {data.expenses.map((expense: Expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </div>
    );
  };

  return (
    <section className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-indigo-secondary rounded-lg flex items-center justify-center">
          <List className="w-4 h-4 text-indigo-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          Your Expenses {getExpenseCount()}
        </h2>
      </div>
      {getContent()}
    </section>
  );
}
