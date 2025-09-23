import { Hono } from "hono";
import { cors } from "hono/cors";
import { swaggerUI } from "@hono/swagger-ui";
import { logger } from "hono/logger";
import { rpcApp, type AppType } from "./rpc";
import type {
  Expense,
  CreateExpenseRequest,
  ExpensesResponse,
  ExpenseResponse,
  CreateExpenseResponse,
  DeleteExpenseResponse,
  HealthResponse,
  ApiError,
} from "@hono_expense_tracker/schemas";

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

// OpenAPI schema definition
const openApiSchema = {
  openapi: "3.0.0",
  info: {
    title: "Expense Tracker API",
    version: "1.0.0",
    description: "A simple expense tracking API built with Hono",
  },
  paths: {
    "/": {
      get: {
        summary: "API Health Check",
        description: "Check if the API is running",
        responses: {
          "200": {
            description: "API is running",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    timestamp: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/health": {
      get: {
        summary: "Health Status",
        description: "Get detailed health status of the API",
        responses: {
          "200": {
            description: "Health status",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    uptime: { type: "number" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/expenses": {
      get: {
        summary: "Get All Expenses",
        description: "Retrieve all expenses",
        responses: {
          "200": {
            description: "List of expenses",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    expenses: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          description: { type: "string" },
                          amount: { type: "number" },
                          category: { type: "string" },
                          date: { type: "string", format: "date" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create Expense",
        description: "Create a new expense",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  description: { type: "string" },
                  amount: { type: "number" },
                  category: { type: "string" },
                  date: { type: "string", format: "date" },
                },
                required: ["description", "amount", "category"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Expense created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    expense: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        description: { type: "string" },
                        amount: { type: "number" },
                        category: { type: "string" },
                        date: { type: "string", format: "date" },
                      },
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Invalid request data",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/expenses/{id}": {
      get: {
        summary: "Get Expense by ID",
        description: "Retrieve a specific expense by its ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
            description: "Expense ID",
          },
        ],
        responses: {
          "200": {
            description: "Expense details",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    expense: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        description: { type: "string" },
                        amount: { type: "number" },
                        category: { type: "string" },
                        date: { type: "string", format: "date" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete Expense",
        description: "Delete an expense by its ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
            description: "Expense ID",
          },
        ],
        responses: {
          "200": {
            description: "Expense deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

// Add Swagger UI
app.get("/swagger", swaggerUI({ url: "/swagger.json" }));
app.get("/swagger.json", (c) => c.json(openApiSchema));

// Mount the RPC app
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

console.log(`🚀 Server starting on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
