import { createRoute } from "@hono/zod-openapi";
import type { Context } from "hono";
import {
  ExpenseIdSchema,
  ExpenseResponseSchema,
} from "@hono_expense_tracker/schemas";
import { expenseTags } from "../../config/openapi-tags";
import { errorResponses } from "../../config/openapi-common-responses";
import type { HonoEnv } from "../../config/hono-context";

const getExpenseByIdRoute = createRoute({
  method: "get",
  path: "/:id",
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
              id: 1,
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
    ...errorResponses,
  },
});

const getExpenseByIdHandler = (c: Context<HonoEnv>) => {
  const id = c.req.param("id");
  const db = c.get("db");

  const response = db.getExpenseById(id);

  if (!response) {
    return c.json({ error: "Expense not found" }, 404);
  }

  const validatedResponse = ExpenseResponseSchema.parse(response);
  return c.json(validatedResponse, 200);
};

export const getExpenseByIdEndpoint = {
  getExpenseByIdRoute,
  getExpenseByIdHandler,
};
