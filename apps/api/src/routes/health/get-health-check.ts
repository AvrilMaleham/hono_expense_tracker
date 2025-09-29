import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { z } from "@hono/zod-openapi";
import { healthTags } from "../../config/openapi-tags";

export const app = new OpenAPIHono();
const healthCheckRoute = createRoute({
  method: "get",
  path: "/",
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

app.openapi(healthCheckRoute, (c) => {
  return c.json({
    message: "Hono API is running!",
    timestamp: new Date().toISOString(),
  });
});
