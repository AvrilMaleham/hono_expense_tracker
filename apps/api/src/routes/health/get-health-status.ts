import { createRoute } from "@hono/zod-openapi";
import type { Context } from "hono";
import { HealthResponseSchema } from "@hono_expense_tracker/schemas";
import { healthTags } from "../../config/openapi-tags";

const healthStatusRoute = createRoute({
  method: "get",
  path: "/status",
  summary: "Health Status",
  description: "Get detailed health status of the API",
  tags: healthTags,
  responses: {
    200: {
      content: {
        "application/json": {
          schema: HealthResponseSchema,
          example: {
            status: "healthy",
            uptime: 1234.567,
          },
        },
      },
      description: "Detailed health status retrieved successfully",
    },
  },
});

const healthStatusHandler = (c: Context) => {
  const healthData = {
    status: "healthy",
    uptime: process.uptime(),
  };
  return c.json(healthData);
};

export const healthStatusEndpoint = { healthStatusRoute, healthStatusHandler };
