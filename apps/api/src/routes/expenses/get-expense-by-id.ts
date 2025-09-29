import { createRoute } from "@hono/zod-openapi";
import { z } from "@hono/zod-openapi";
import type { Context } from "hono";
import {
  ExpenseIdSchema,
  ExpenseResponseSchema,
} from "@hono_expense_tracker/schemas";
import { expenseTags } from "../../config/openapi-tags";

const getExpenseByIdRoute = createRoute({
  method: "get",
  path: "/{id}",
  summary: "Get Expense by ID",
  description: "Retrieve a specific expense by its ID",
  tags: expenseTags,
  request: {
    params: ExpenseIdSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ExpenseResponseSchema,
          example: {
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
      description: "Expense details",
    },
  },
});

const getExpenseByIdHandler = (c: any) => {
  const { id } = c.req.valid("param");

  const foundExpense = {
    id,
    description: "Coffee",
    amount: 4.5,
    category: "Food",
    date: "2024-01-15",
  };

  return c.json({ expense: foundExpense }, 200);
};

export const getExpenseByIdEndpoint = {
  getExpenseByIdRoute,
  getExpenseByIdHandler,
};
