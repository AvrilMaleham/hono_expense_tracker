import { createFileRoute } from "@tanstack/react-router";
import { ExpenseForm } from "../components/expenses/expense-form";
import { ExpenseList } from "../components/expenses/expense-list";
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
      <div className="flex flex-col lg:flex-row gap-8 p-8">
        <div className="flex-1">
          <ExpenseForm />
        </div>
        <div className="lg:hidden">
          <Separator />
        </div>
        <div className="flex-1">
          <ExpenseList />
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/expenses")({
  component: ExpensesPage,
});
