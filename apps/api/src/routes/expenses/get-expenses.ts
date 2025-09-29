import { createRoute } from "@hono/zod-openapi";
import { z } from "@hono/zod-openapi";
import type { Context } from "hono";
import { ExpenseSchema } from "@hono_expense_tracker/schemas";
import { expenseTags } from "../../config/openapi-tags";

const getExpensesRoute = createRoute({
  method: "get",
  path: "/",
  summary: "Get All Expenses",
  description: "Retrieve all expenses",
  tags: expenseTags,
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            expenses: z.array(ExpenseSchema),
          }),
          example: {
            expenses: [
              {
                id: "1",
                description: "Coffee",
                amount: 4.5,
                category: "Food",
                date: "2024-01-15",
              },
              {
                id: "2",
                description: "Gas",
                amount: 45.0,
                category: "Transportation",
                date: "2024-01-14",
              },
            ],
          },
        },
      },
      description: "Retrieve all expenses",
    },
  },
});

const getExpensesHandler = (c: Context) => {
  const expenses = [
    {
      id: "1",
      description: "Coffee",
      amount: 4.5,
      category: "Food",
      date: "2024-01-15",
    },
    {
      id: "2",
      description: "Gas",
      amount: 45.0,
      category: "Transportation",
      date: "2024-01-14",
    },
    {
      id: "3",
      description: "Groceries",
      amount: 85.3,
      category: "Food",
      date: "2024-01-13",
    },
  ];
  return c.json({ expenses });
};

export const getExpensesEndpoint = { getExpensesRoute, getExpensesHandler };
