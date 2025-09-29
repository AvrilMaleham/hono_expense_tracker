import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { HealthResponseSchema } from "@hono_expense_tracker/schemas";
import { z } from "@hono/zod-openapi";
import { healthTags } from "../../config/openapi-tags";

export const app = new OpenAPIHono();
const healthStatusRoute = createRoute({
  method: "get",
  path: "/",
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

app.openapi(healthStatusRoute, (c) => {
  const healthData = {
    status: "healthy",
    uptime: process.uptime(),
  };
  return c.json(HealthResponseSchema.parse(healthData));
});
