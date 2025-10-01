import { createFileRoute } from "@tanstack/react-router";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseList } from "../components/ExpenseList";

function ExpensesPage() {
  return (
    <div>
      <div>
        <h1>Expenses Management</h1>
        <p>Add and manage your expenses</p>
      </div>

      <ExpenseForm />
      <ExpenseList />
    </div>
  );
}

export const Route = createFileRoute("/expenses")({
  component: ExpensesPage,
});
