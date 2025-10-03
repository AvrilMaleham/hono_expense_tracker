import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type {
  CreateExpenseRequest,
  ExpensesResponse,
} from "@hono_expense_tracker/schemas";

export function useExpenses() {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: () => api.expenses.$get().then((res) => res.json()),
  });
}

export function useExpense(id: number) {
  return useQuery({
    queryKey: ["expenses", id],
    queryFn: () =>
      api.expenses[":id"].$get({ param: { id } }).then((res) => res.json()),
    enabled: !!id,
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExpenseRequest) =>
      api.expenses.$post({ json: data }).then((res) => res.json()),
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
    mutationFn: (id: number) =>
      api.expenses[":id"].$delete({ param: { id } }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}
