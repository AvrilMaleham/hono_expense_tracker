import { createRoute } from "@hono/zod-openapi";
import type { Context } from "hono";
import {
  CreateExpenseSchema,
  CreateExpenseResponseSchema,
} from "@hono_expense_tracker/schemas";
import { expenseTags } from "../../config/openapi-tags";
import { errorResponses } from "../../config/openapi-common-responses";
import type { HonoEnv } from "../../config/hono-context";
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
    ...errorResponses,
  },
});

const postExpensesHandler = async (c: Context<HonoEnv>) => {
  const body = await c.req.json();
  const db = c.get("db");

  const response = db.createExpense(body);
  const validatedResponse = CreateExpenseResponseSchema.parse(response);

  return c.json(validatedResponse, 201);
};

export const postExpensesEndpoint = { postExpensesRoute, postExpensesHandler };
