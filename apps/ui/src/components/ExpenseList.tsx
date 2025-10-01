import { useExpenses } from "../hooks/useExpenses";
import { ExpenseItem } from "./ExpenseItem";

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
    <section>
      <h2>Your Expenses ({data.expenses.length})</h2>
      <div>
        {data.expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </div>
    </section>
  );
}
