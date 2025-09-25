import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  ExpenseSchema,
  CreateExpenseSchema,
  ExpenseIdSchema,
  HealthResponseSchema,
} from "@hono_expense_tracker/schemas";

// Create the RPC app
export const rpcApp = new Hono();

// Get all expenses
rpcApp.get("/expenses", (c) => {
  // Mock data
  const expenses = [
    {
      id: 1,
      description: "Coffee",
      amount: 4.5,
      category: "Food",
      date: "2024-01-15",
    },
    {
      id: 2,
      description: "Gas",
      amount: 45.0,
      category: "Transportation",
      date: "2024-01-14",
    },
    {
      id: 3,
      description: "Groceries",
      amount: 85.3,
      category: "Food",
      date: "2024-01-13",
    },
  ];
  return c.json({ expenses });
});

// Create expense with validation
rpcApp.post("/expenses", zValidator("json", CreateExpenseSchema), (c) => {
  const body = c.req.valid("json");
  const newExpense = {
    id: Date.now(),
    description: body.description,
    amount: body.amount,
    category: body.category,
    date: body.date ?? new Date().toISOString().split("T")[0],
  };
  return c.json(
    {
      message: "Expense created",
      expense: newExpense,
    },
    201
  );
});

// Get expense by ID with validation
rpcApp.get("/expenses/:id", zValidator("param", ExpenseIdSchema), (c) => {
  const { id } = c.req.valid("param");
  const expense = {
    id,
    description: "Sample expense",
    amount: 25.0,
    category: "Misc",
    date: "2024-01-15",
  };
  return c.json({ expense });
});

// Delete expense with validation
rpcApp.delete("/expenses/:id", zValidator("param", ExpenseIdSchema), (c) => {
  const { id } = c.req.valid("param");
  return c.json({
    message: `Expense ${id} deleted successfully`,
  });
});

// Export the type for the client
export type AppType = typeof rpcApp;
