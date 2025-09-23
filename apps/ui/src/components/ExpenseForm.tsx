import { useState } from "react";
import { useCreateExpense } from "../hooks/useExpenses";
import type { CreateExpenseRequest } from "@hono_expense_tracker/schemas";

export function ExpenseForm() {
  const [newExpense, setNewExpense] = useState<CreateExpenseRequest>({
    description: "",
    amount: 0,
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const createExpenseMutation = useCreateExpense();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createExpenseMutation.mutate(newExpense, {
      onSuccess: () => {
        setNewExpense({
          description: "",
          amount: 0,
          category: "",
          date: new Date().toISOString().split("T")[0],
        });
      },
    });
  };

  return (
    <section className="add-expense-section">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-row">
          <input
            type="text"
            placeholder="Description"
            value={newExpense.description}
            onChange={(e) =>
              setNewExpense({ ...newExpense, description: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Amount"
            step="0.01"
            min="0"
            value={newExpense.amount || ""}
            onChange={(e) =>
              setNewExpense({
                ...newExpense,
                amount: parseFloat(e.target.value) || 0,
              })
            }
            required
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            placeholder="Category"
            value={newExpense.category}
            onChange={(e) =>
              setNewExpense({ ...newExpense, category: e.target.value })
            }
            required
          />
          <input
            type="date"
            value={newExpense.date}
            onChange={(e) =>
              setNewExpense({ ...newExpense, date: e.target.value })
            }
            required
          />
        </div>
        <button
          type="submit"
          disabled={createExpenseMutation.isPending}
          className="submit-btn"
        >
          {createExpenseMutation.isPending ? "Adding..." : "Add Expense"}
        </button>
        {createExpenseMutation.isError && (
          <div className="error-message">
            {createExpenseMutation.error?.message || "Failed to create expense"}
          </div>
        )}
      </form>
    </section>
  );
}
