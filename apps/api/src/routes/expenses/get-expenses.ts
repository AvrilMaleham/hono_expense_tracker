import { createRoute } from "@hono/zod-openapi";
import type { Context } from "hono";
import { ExpensesListResponseSchema } from "@hono_expense_tracker/schemas";
import { expenseTags } from "../../config/openapi-tags";
import { errorResponses } from "../../config/openapi-common-responses";
import type { HonoEnv } from "../../config/hono-context";

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
          schema: ExpensesListResponseSchema,
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
    ...errorResponses,
  },
});

const getExpensesHandler = (c: Context<HonoEnv>) => {
  const db = c.get("db");

  const response = db.getExpense();
  const validatedResponse = ExpensesListResponseSchema.parse(response);

  return c.json(validatedResponse, 200);
};

export const getExpensesEndpoint = { getExpensesRoute, getExpensesHandler };
