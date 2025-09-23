import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import type {
  CreateExpenseRequest,
  ExpensesResponse,
} from "@hono_expense_tracker/schemas";

export function useExpenses() {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: api.getExpenses,
  });
}

export function useExpense(id: number) {
  return useQuery({
    queryKey: ["expenses", id],
    queryFn: () => api.getExpense(id),
    enabled: !!id,
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createExpense,
    onMutate: async (newExpense: CreateExpenseRequest) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["expenses"] });

      // Snapshot previous value
      const previousExpenses = queryClient.getQueryData(["expenses"]);

      // Optimistically update
      queryClient.setQueryData(
        ["expenses"],
        (old: ExpensesResponse | undefined) => {
          if (!old) return old;
          return {
            expenses: [
              ...old.expenses,
              {
                id: Date.now(),
                ...newExpense,
                date: newExpense.date || new Date().toISOString().split("T")[0],
              },
            ],
          };
        }
      );

      return { previousExpenses };
    },
    onError: (_err, _newExpense, context) => {
      // Rollback on error
      if (context?.previousExpenses) {
        queryClient.setQueryData(["expenses"], context.previousExpenses);
      }
    },
    onSettled: () => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}
