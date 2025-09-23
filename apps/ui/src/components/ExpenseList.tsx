import { useExpenses } from "../hooks/useExpenses";
import { ExpenseItem } from "./ExpenseItem";

export function ExpenseList() {
  const { data, isLoading, error } = useExpenses();

  if (isLoading) {
    return <div className="loading">Loading expenses...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        {error.message || "Failed to load expenses"}
      </div>
    );
  }

  if (!data?.expenses || data.expenses.length === 0) {
    return <div className="no-expenses">No expenses found. Add one above!</div>;
  }

  return (
    <section className="expenses-section">
      <h2>Your Expenses ({data.expenses.length})</h2>
      <div className="expenses-list">
        {data.expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </div>
    </section>
  );
}
