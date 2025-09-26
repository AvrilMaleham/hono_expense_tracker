import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import {
  CreateExpenseSchema,
  ExpenseSchema,
} from "@hono_expense_tracker/schemas";

export const app = new OpenAPIHono();
const postExpensesRoute = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateExpenseSchema,
          example: {
            description: "Coffee",
            amount: 4.5,
            category: "Food",
            date: "2024-01-15",
          },
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            expense: ExpenseSchema,
          }),
          example: {
            message: "Expense created",
            expense: {
              id: 1705334400000,
              description: "Coffee",
              amount: 4.5,
              category: "Food",
              date: "2024-01-15",
            },
          },
        },
      },
      description: "Expense created successfully",
    },
  },
});

app.openapi(postExpensesRoute, (c) => {
  const body = c.req.valid("json");
  const newExpense = {
    id: Date.now(),
    description: body.description,
    amount: body.amount,
    category: body.category,
    date: body.date,
  };
  return c.json(
    {
      message: "Expense created",
      expense: newExpense,
    },
    201
  );
});
