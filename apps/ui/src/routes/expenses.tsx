import { createFileRoute } from "@tanstack/react-router";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseList } from "../components/ExpenseList";
import { Separator } from "@/components/ui/separator";

function ExpensesPage() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Expenses Management</h1>
        <h2 className="text-lg font-semibold text-secondary-foreground">
          Add and manage your expenses
        </h2>
      </div>
      <Separator />
      <ExpenseForm />
      <Separator />
      <ExpenseList />
    </div>
  );
}

export const Route = createFileRoute("/expenses")({
  component: ExpensesPage,
});
