import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  CreateExpenseSchema,
  ExpenseIdSchema,
} from "@hono_expense_tracker/schemas";

export const expensesRoutes = new Hono();

expensesRoutes.get(
  "/expenses/:id",
  zValidator("param", ExpenseIdSchema),
  (c) => {
    const { id } = c.req.valid("param");
    const expense = {
      id,
      description: "Sample expense",
      amount: 25.0,
      category: "Misc",
      date: "2024-01-15",
    };
    return c.json({ expense });
  }
);

expensesRoutes.delete(
  "/expenses/:id",
  zValidator("param", ExpenseIdSchema),
  (c) => {
    const { id } = c.req.valid("param");
    return c.json({
      message: `Expense ${id} deleted successfully`,
    });
  }
);
