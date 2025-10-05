import { createFileRoute } from "@tanstack/react-router";
import { ExpenseForm } from "../components/expenses/expense-form";
import { ExpenseList } from "../components/expenses/expense-list";

function ExpensesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Expense Management
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track your spending, categorize expenses, and gain insights into
              your financial habits.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <ExpenseForm />
            </div>
          </div>

          {/* List Section */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <ExpenseList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/expenses")({
  component: ExpensesPage,
});
