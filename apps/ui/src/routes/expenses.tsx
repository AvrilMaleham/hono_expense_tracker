import { createFileRoute } from "@tanstack/react-router";
import { ExpensesPage } from "@/components/expenses/expense-page";

export const Route = createFileRoute("/expenses")({
  component: ExpensesPage,
});
