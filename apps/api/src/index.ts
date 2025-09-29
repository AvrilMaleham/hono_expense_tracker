import { cors } from "hono/cors";
import { swaggerUI } from "@hono/swagger-ui";
import { logger } from "hono/logger";
import type { ApiError } from "@hono_expense_tracker/schemas";
import { OpenAPIHono } from "@hono/zod-openapi";
import { healthRoutes } from "./routes/health/router";
import { expensesRoutes } from "./routes/expenses/router";

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

// Mount the routes
app.route("/health", healthRoutes);
app.route("/expenses", expensesRoutes);

// The openapi.json will be available at /doc
app.doc31("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

// Add Swagger UI
app.get("/docs", swaggerUI({ url: "/doc" }));

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

export type AppType = typeof app;

export default {
  port,
  fetch: app.fetch,
};
