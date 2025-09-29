import {
  getExpense,
  getExpenseById,
  createExpense,
  deleteExpense,
} from "./get-expense";

export function createDatabaseInterface() {
  return {
    getExpense,
    getExpenseById,
    createExpense,
    deleteExpense,
  };
}
