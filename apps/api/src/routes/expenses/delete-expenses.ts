import { createRoute } from "@hono/zod-openapi";
import type { Context } from "hono";
import {
  ExpenseIdSchema,
  DeleteExpenseResponseSchema,
} from "@hono_expense_tracker/schemas";
import { expenseTags } from "../../config/openapi-tags";
import { errorResponses } from "../../config/openapi-common-responses";
import type { HonoEnv } from "../../config/hono-context";

const deleteExpenseRoute = createRoute({
  method: "delete",
  path: "/{id}",
  summary: "Delete Expense",
  description: "Delete an expense by its ID",
  tags: expenseTags,
  request: {
    params: ExpenseIdSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DeleteExpenseResponseSchema,
          example: {
            message: "Expense 1 deleted successfully",
          },
        },
      },
      description: "Expense deleted successfully",
    },
    ...errorResponses,
  },
});

const deleteExpenseHandler = (c: Context<HonoEnv>) => {
  const id = c.req.param("id");
  const db = c.get("db");

  const response = db.deleteExpense(id);

  if (!response) {
    return c.json({ error: "Expense not found" }, 404);
  }

  const validatedResponse = DeleteExpenseResponseSchema.parse(response);
  return c.json(validatedResponse, 200);
};

export const deleteExpenseEndpoint = {
  deleteExpenseRoute,
  deleteExpenseHandler,
};
