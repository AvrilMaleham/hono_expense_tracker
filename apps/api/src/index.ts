import { swaggerUI } from "@hono/swagger-ui";
import { logger } from "hono/logger";
import type { ApiError } from "@hono_expense_tracker/schemas";
import { OpenAPIHono } from "@hono/zod-openapi";
import { healthRoutes } from "./routes/health/router";
import { expensesRoutes } from "./routes/expenses/router";
import { createDatabaseInterface } from "./services/database/database-interface";
import type { HonoEnv } from "./config/hono-context";

const app = new OpenAPIHono<HonoEnv>();

app.use("*", logger());

app.use(async (c, next) => {
  c.set("db", createDatabaseInterface());
  await next();
});

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

// Mount routes with chaining for type inference
const appWithRoutes = app
  .route("/api/health", healthRoutes)
  .route("/api/expenses", expensesRoutes);

// Error handling
appWithRoutes.onError((err, c) => {
  console.error("Error:", err);
  const errorResponse: ApiError = { error: "Internal Server Error" };
  return c.json(errorResponse, 500);
});

// 404 handler
appWithRoutes.notFound((c) => {
  const errorResponse: ApiError = { error: "Not Found" };
  return c.json(errorResponse, 404);
});

const port = process.env.PORT || 3000;

export type AppType = typeof appWithRoutes;

export default {
  port,
  fetch: appWithRoutes.fetch,
};
