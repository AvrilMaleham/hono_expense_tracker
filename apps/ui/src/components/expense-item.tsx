import { useDeleteExpense } from "../hooks/use-expenses";
import type { Expense } from "@hono_expense_tracker/schemas";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategoryColor } from "@/lib/constants";

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

  return (
    <Card className={`mb-4 ${getCategoryColor(expense.category)}`}>
      <CardHeader>
        <CardTitle>{expense.description}</CardTitle>
        <CardDescription>${expense.amount}</CardDescription>
        <CardAction className="capitalize">{expense.category}</CardAction>
      </CardHeader>
      <CardContent>
        <p>{expense.date}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleDelete}
          disabled={deleteExpenseMutation.isPending}
        >
          {deleteExpenseMutation.isPending ? "Deleting..." : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  );
}
