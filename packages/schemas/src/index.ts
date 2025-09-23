// Shared schema definitions for the expense tracker

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export interface CreateExpenseRequest {
  description: string;
  amount: number;
  category: string;
  date?: string;
}

export interface ExpenseResponse {
  expense: Expense;
}

export interface ExpensesResponse {
  expenses: Expense[];
}

export interface CreateExpenseResponse {
  message: string;
  expense: Expense;
}

export interface DeleteExpenseResponse {
  message: string;
}

export interface HealthResponse {
  status: string;
  uptime: number;
}

export interface ApiError {
  error: string;
}

// Common expense categories
export const EXPENSE_CATEGORIES = [
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Shopping",
  "Travel",
  "Misc",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
