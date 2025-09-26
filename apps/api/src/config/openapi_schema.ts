export const openApiSchema = {
  openapi: "3.0.0",
  info: {
    title: "Expense Tracker API",
    version: "1.0.0",
    description: "A simple expense tracking API built with Hono",
  },
  paths: {
    "/health/status": {
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
