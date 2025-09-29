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

// Response schemas
export const ExpensesListResponseSchema = z.object({
  expenses: z.array(ExpenseSchema),
});

export const ExpenseResponseSchema = z.object({
  expense: ExpenseSchema,
});

export const CreateExpenseResponseSchema = z.object({
  message: z.string(),
  expense: ExpenseSchema,
});

export const DeleteExpenseResponseSchema = z.object({
  message: z.string(),
});

export const HealthCheckResponseSchema = z.object({
  message: z.string(),
  timestamp: z.string(),
});

// Error schemas
export const ApiErrorSchema = z.object({
  error: z.string(),
});

// TypeScript types inferred from Zod schemas
export type Expense = z.infer<typeof ExpenseSchema>;
export type CreateExpenseRequest = z.infer<typeof CreateExpenseSchema>;
export type ApiError = z.infer<typeof ApiErrorSchema>;
