import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { z } from "@hono/zod-openapi";
import { ExpenseIdSchema } from "@hono_expense_tracker/schemas";
import { expenseTags } from "../../config/openapi-tags";

export const app = new OpenAPIHono();

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
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: "Expense deleted successfully",
    },
  },
});

app.openapi(deleteExpenseRoute, (c) => {
  const { id } = c.req.valid("param");

  const numericId = parseInt(id, 10);

  return c.json({
    message: `Expense ${numericId} deleted successfully`,
  });
});
