import { useDeleteExpense } from "@/hooks/expenses/use-expenses";
import type { Expense } from "@hono_expense_tracker/schemas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategoryColor, getCategoryBorderColor } from "@/lib/constants";

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
    <Card
      className={`mb-4 border border-border hover:shadow-md transition-shadow bg-card border-l-4 ${getCategoryBorderColor(expense.category)}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground mb-1">
              {expense.description}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="font-medium text-lg text-foreground">
                ${expense.amount}
              </span>
              <span
                className={`px-2 py-1 ${getCategoryColor(expense.category)} text-foreground rounded-md text-xs font-medium capitalize`}
              >
                {expense.category}
              </span>
            </div>
          </div>
          <Button
            onClick={handleDelete}
            disabled={deleteExpenseMutation.isPending}
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive hover:scale-110 transition-transform"
          >
            {deleteExpenseMutation.isPending ? "..." : "×"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground">
          {new Date(expense.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </CardContent>
    </Card>
  );
}
