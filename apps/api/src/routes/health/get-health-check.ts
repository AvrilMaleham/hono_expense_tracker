import { createRoute } from "@hono/zod-openapi";
import type { Context } from "hono";
import { HealthCheckResponseSchema } from "@hono_expense_tracker/schemas";
import { healthTags } from "../../config/openapi-tags";
import { errorResponses } from "../../config/openapi-common-responses";

const healthCheckRoute = createRoute({
  method: "get",
  path: "/check",
  summary: "Health Check",
  description: "Check if API is running",
  tags: healthTags,
  responses: {
    200: {
      content: {
        "application/json": {
          schema: HealthCheckResponseSchema,
          example: {
            message: "Hono API is running!",
            timestamp: "2024-01-15T10:30:00.000Z",
          },
        },
      },
      description: "API is running successfully",
    },
    ...errorResponses,
  },
});

const healthCheckHandler = (c: Context) => {
  return c.json({
    message: "Hono API is running!",
    timestamp: new Date().toISOString(),
  });
};

export const healthCheckEndpoint = { healthCheckRoute, healthCheckHandler };
