import { useDeleteExpense } from "../hooks/useExpenses";
import type { Expense } from "@hono_expense_tracker/schemas";

interface ExpenseItemProps {
  expense: Expense;
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  const deleteExpenseMutation = useDeleteExpense();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      deleteExpenseMutation.mutate(expense.id);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div>
      <div>
        <h3>{expense.description}</h3>
        <span>{formatCurrency(expense.amount)}</span>
      </div>
      <div>
        <span>{expense.category}</span>
        <span>{expense.date}</span>
        <button
          onClick={handleDelete}
          disabled={deleteExpenseMutation.isPending}
        >
          {deleteExpenseMutation.isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
