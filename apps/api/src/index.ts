import { Hono } from "hono";
import { cors } from "hono/cors";
import { swaggerUI } from "@hono/swagger-ui";
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

// Basic health check endpoint
app.get("/", (c) => {
  return c.json({
    message: "Hono API is running!",
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
app.get("/health", (c) => {
  const response: HealthResponse = {
    status: "healthy",
    uptime: process.uptime(),
  };
  return c.json(response);
});

// Sample expense endpoints for the expense tracker
app.get("/expenses", (c) => {
  // Mock data for now
  const expenses: Expense[] = [
    {
      id: 1,
      description: "Coffee",
      amount: 4.5,
      category: "Food",
      date: "2024-01-15",
    },
    {
      id: 2,
      description: "Gas",
      amount: 45.0,
      category: "Transportation",
      date: "2024-01-14",
    },
    {
      id: 3,
      description: "Groceries",
      amount: 85.3,
      category: "Food",
      date: "2024-01-13",
    },
  ];
  const response: ExpensesResponse = { expenses };
  return c.json(response);
});

app.post("/expenses", async (c) => {
  try {
    const body: CreateExpenseRequest = await c.req.json();
    // In a real app, you'd save this to a database
    const newExpense: Expense = {
      id: Date.now(), // Simple ID generation
      description: body.description,
      amount: body.amount,
      category: body.category,
      date: (body.date ?? new Date().toISOString().split("T")[0]) as string,
    };
    const response: CreateExpenseResponse = {
      message: "Expense created",
      expense: newExpense,
    };
    return c.json(response, 201);
  } catch (error) {
    const errorResponse: ApiError = { error: "Invalid JSON" };
    return c.json(errorResponse, 400);
  }
});

app.get("/expenses/:id", (c) => {
  const id = c.req.param("id");
  // Mock single expense
  const expense: Expense = {
    id: parseInt(id),
    description: "Sample expense",
    amount: 25.0,
    category: "Misc",
    date: "2024-01-15",
  };
  const response: ExpenseResponse = { expense };
  return c.json(response);
});

app.delete("/expenses/:id", (c) => {
  const id = c.req.param("id");
  // In a real app, you'd delete from database
  const response: DeleteExpenseResponse = {
    message: `Expense ${id} deleted successfully`,
  };
  return c.json(response);
});

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
