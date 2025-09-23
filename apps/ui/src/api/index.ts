// API client for communicating with the Hono backend
import type {
  CreateExpenseRequest,
  ExpensesResponse,
  ExpenseResponse,
  CreateExpenseResponse,
  DeleteExpenseResponse,
  HealthResponse,
} from "@hono_expense_tracker/schemas";

const API_BASE = "/api";

export const api = {
  // Get all expenses
  async getExpenses(): Promise<ExpensesResponse> {
    const response = await fetch(`${API_BASE}/expenses`);
    if (!response.ok) {
      throw new Error("Failed to fetch expenses");
    }
    return response.json();
  },

  // Get a specific expense by ID
  async getExpense(id: number): Promise<ExpenseResponse> {
    const response = await fetch(`${API_BASE}/expenses/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch expense");
    }
    return response.json();
  },

  // Create a new expense
  async createExpense(
    expense: CreateExpenseRequest
  ): Promise<CreateExpenseResponse> {
    const response = await fetch(`${API_BASE}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });
    if (!response.ok) {
      throw new Error("Failed to create expense");
    }
    return response.json();
  },

  // Delete an expense
  async deleteExpense(id: number): Promise<DeleteExpenseResponse> {
    const response = await fetch(`${API_BASE}/expenses/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete expense");
    }
    return response.json();
  },

  // Health check
  async healthCheck(): Promise<HealthResponse> {
    const response = await fetch(`${API_BASE}/health`);
    if (!response.ok) {
      throw new Error("Health check failed");
    }
    return response.json();
  },
};
