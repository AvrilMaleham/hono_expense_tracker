import { createRoute } from "@hono/zod-openapi";
import type { Context } from "hono";
import {
  ExpenseIdSchema,
  DeleteExpenseResponseSchema,
} from "@hono_expense_tracker/schemas";
import { expenseTags } from "../../config/openapi-tags";

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
  },
});

const deleteExpenseHandler = (c: any) => {
  const { id } = c.req.valid("param");

  const numericId = parseInt(id, 10);

  return c.json({
    message: `Expense ${numericId} deleted successfully`,
  });
};

export const deleteExpenseEndpoint = {
  deleteExpenseRoute,
  deleteExpenseHandler,
};
