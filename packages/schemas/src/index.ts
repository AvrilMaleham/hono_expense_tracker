// Shared schema definitions for the expense tracker
import { z } from "@hono/zod-openapi";

// Zod schemas for validation and type inference
export const ExpenseSchema = z.object({
  id: z.string(),
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
  id: z.string(),
});

export const HealthResponseSchema = z.object({
  status: z.string(),
  uptime: z.number(),
});

// TypeScript types inferred from Zod schemas
export type Expense = z.infer<typeof ExpenseSchema>;
export type CreateExpenseRequest = z.infer<typeof CreateExpenseSchema>;
export type HealthResponse = z.infer<typeof HealthResponseSchema>;

// Response types
export interface ExpensesResponse {
  expenses: Expense[];
}

export interface ApiError {
  error: string;
}
