import { Hono } from "hono";
import { cors } from "hono/cors";
import { swaggerUI } from "@hono/swagger-ui";
import { logger } from "hono/logger";
import { expensesRoutes } from "./routes/expenses/expenses";
import { openApiSchema } from "./config/openapi_schema";
import type { ApiError } from "@hono_expense_tracker/schemas";
import { healthRoutes } from "./routes/health/health";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

const app = new OpenAPIHono();

// Add CORS middleware
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        process.env.CORS_ORIGIN || "https://yourapp.com",
        "https://www.yourapp.com",
      ]
    : [
        process.env.CORS_ORIGIN || "http://localhost:5173",
        "http://localhost:3000",
      ];

app.use(
  "*",
  logger(),
  cors({
    origin: allowedOrigins,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// The openapi.json will be available at /doc
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

const basicRoute = createRoute({
  method: "get",
  path: "/basic/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            hello: z.string(),
          }),
        },
      },
      description: "say hello",
    },
  },
});

app.openapi(basicRoute, (c) => {
  return c.json({ hello: "world" }, 200);
});

// Add Swagger UI
app.get("/ui", swaggerUI({ url: "/doc" }));

// Mount the routes
app.route("/health", healthRoutes);
app.route("/", expensesRoutes);

// Error handling
app.onError((err, c) => {
  console.error("Error:", err);
  const errorResponse: ApiError = { error: "Internal Server Error" };
  return c.json(errorResponse, 500);
});

// 404 handler
app.notFound((c) => {
  const errorResponse: ApiError = { error: "Not Found" };
  return c.json(errorResponse, 404);
});

const port = process.env.PORT || 3000;

export default {
  port,
  fetch: app.fetch,
};
