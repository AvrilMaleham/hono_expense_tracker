import { Hono } from "hono";
import { cors } from "hono/cors";
import { swaggerUI } from "@hono/swagger-ui";
import { logger } from "hono/logger";
import { rpcApp } from "./routes";
import { openApiSchema } from "./config/openapi_schema";
import type { ApiError } from "@hono_expense_tracker/schemas";
import { healthRoutes } from "./routes/health/health";

const app = new Hono();

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

// Add Swagger UI
app.get("/swagger", swaggerUI({ url: "/swagger.json" }));
app.get("/swagger.json", (c) => c.json(openApiSchema));

// Mount the RPC app
app.route("/health", healthRoutes);
app.route("/", rpcApp);

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
