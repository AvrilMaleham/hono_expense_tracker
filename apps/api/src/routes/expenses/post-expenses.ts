import { createRoute } from "@hono/zod-openapi";
import type { Context } from "hono";
import {
  CreateExpenseSchema,
  CreateExpenseResponseSchema,
} from "@hono_expense_tracker/schemas";
import { expenseTags } from "../../config/openapi-tags";
const postExpensesRoute = createRoute({
  method: "post",
  path: "/",
  summary: "Create Expense",
  description: "Create a new expense",
  tags: expenseTags,
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
          schema: CreateExpenseResponseSchema,
          example: {
            message: "Expense created",
            expense: {
              id: "1",
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

const postExpensesHandler = (c: any) => {
  const body = c.req.valid("json");
  const newExpense = {
    id: "1",
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
};

export const postExpensesEndpoint = { postExpensesRoute, postExpensesHandler };
