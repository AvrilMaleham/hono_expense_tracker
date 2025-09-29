import { createRoute } from "@hono/zod-openapi";
import { HealthResponseSchema } from "@hono_expense_tracker/schemas";
import { z } from "@hono/zod-openapi";
import type { Context } from "hono";
import { healthTags } from "../../config/openapi-tags";

const healthStatusRoute = createRoute({
  method: "get",
  path: "/status",
  tags: healthTags,
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            status: z.string(),
            uptime: z.number(),
          }),
        },
      },
      description: "Get detailed health status of the API",
    },
  },
});

const healthStatusHandler = (c: any) => {
  const healthData = {
    status: "healthy",
    uptime: process.uptime(),
  };
  return c.json(HealthResponseSchema.parse(healthData));
};

export const healthStatusEndpoint = { healthStatusRoute, healthStatusHandler };
