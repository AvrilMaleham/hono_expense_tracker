import { createRoute } from "@hono/zod-openapi";
import { z } from "@hono/zod-openapi";
import type { Context } from "hono";
import { healthTags } from "../../config/openapi-tags";

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
          schema: z.object({
            message: z.string(),
            timestamp: z.string(),
          }),
          example: {
            message: "Hono API is running!",
            timestamp: "2024-01-15T10:30:00.000Z",
          },
        },
      },
      description: "API is running successfully",
    },
  },
});

const healthCheckHandler = (c: Context) => {
  return c.json({
    message: "Hono API is running!",
    timestamp: new Date().toISOString(),
  });
};

export const healthCheckEndpoint = { healthCheckRoute, healthCheckHandler };
