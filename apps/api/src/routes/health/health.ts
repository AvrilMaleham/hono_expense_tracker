import { Hono } from "hono";
import { HealthResponseSchema } from "@hono_expense_tracker/schemas";

export const healthRoutes = new Hono();

healthRoutes.get("/check", (c) => {
  return c.json({
    message: "Hono API is running!",
    timestamp: new Date().toISOString(),
  });
});

healthRoutes.get("/status", (c) => {
  const healthData = {
    status: "healthy",
    uptime: process.uptime(),
  };
  return c.json(HealthResponseSchema.parse(healthData));
});
