import { ApiErrorSchema } from "@hono_expense_tracker/schemas";

// Common error response components for OpenAPI documentation
export const errorResponses = {
  400: {
    description: "Bad Request",
    content: {
      "application/json": {
        schema: ApiErrorSchema,
        example: {
          error: "Bad Request",
        },
      },
    },
  },
  404: {
    description: "Not Found",
    content: {
      "application/json": {
        schema: ApiErrorSchema,
        example: {
          error: "Not Found",
        },
      },
    },
  },
  500: {
    description: "Internal Server Error",
    content: {
      "application/json": {
        schema: ApiErrorSchema,
        example: {
          error: "Internal Server Error",
        },
      },
    },
  },
};
