import { createRoute } from "@hono/zod-openapi";
import { z } from "@hono/zod-openapi";
import { healthTags } from "../../config/openapi-tags";

const healthCheckRoute = createRoute({
  method: "get",
  path: "/check",
  tags: healthTags,
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            timestamp: z.string(),
          }),
        },
      },
      description: "Check is API is running",
    },
  },
});

const healthCheckHandler = (c: any) => {
  return c.json({
    message: "Hono API is running!",
    timestamp: new Date().toISOString(),
  });
};

export const healthCheckEndpoint = { healthCheckRoute, healthCheckHandler };
