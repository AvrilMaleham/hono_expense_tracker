// Shared schema definitions for the expense tracker
import { z } from "zod";

// Zod schemas for validation and type inference
export const ExpenseSchema = z.object({
  id: z.number(),
  description: z.string(),
  amount: z.number(),
  category: z.string(),
  date: z.string(),
});

export const CreateExpenseSchema = z.object({
  description: z.string(),
  amount: z.number(),
  category: z.string(),
  date: z.string(),
});

export const ExpenseIdSchema = z.object({
  id: z.coerce.number(),
});

export const HealthResponseSchema = z.object({
  status: z.string(),
  uptime: z.number(),
});

// TypeScript types inferred from Zod schemas
export type Expense = z.infer<typeof ExpenseSchema>;
export type CreateExpenseRequest = z.infer<typeof CreateExpenseSchema>;
export type ExpenseId = z.infer<typeof ExpenseIdSchema>;
export type HealthResponse = z.infer<typeof HealthResponseSchema>;

// Response types
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
