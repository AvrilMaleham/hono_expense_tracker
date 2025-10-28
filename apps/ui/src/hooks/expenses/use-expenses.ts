import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { CreateExpenseRequest } from "@hono_expense_tracker/schemas";

export function useExpenses() {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await api.expenses.$get({
        param: {},
      });
      if (!res.ok) throw new Error("Failed to fetch expenses");
      return res.json();
    },
  });
}

export function useExpense(id: number) {
  return useQuery({
    queryKey: ["expenses", id],
    queryFn: async () => {
      const res = await api.expenses[":id"].$get({
        param: { id: id.toString() },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch expense");
      }
      return res.json();
    },
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateExpenseRequest) => {
      const res = await api.expenses.$post({ json: data });
      if (!res.ok) {
        throw new Error("Failed to create expense");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.expenses[":id"].$delete({
        param: { id: id.toString() },
      });
      if (!res.ok) {
        throw new Error("Failed to delete expense");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}
