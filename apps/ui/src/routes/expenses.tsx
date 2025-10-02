import { createFileRoute } from "@tanstack/react-router";
import { ExpenseForm } from "../components/expense-form";
import { ExpenseList } from "../components/expense-list";
import { Separator } from "@/components/ui/separator";

function ExpensesPage() {
  return (
    <div>
      <div className="m-8">
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
