import {
  getExpense,
  getExpenseById,
  createExpense,
  deleteExpense,
} from "./expenses";

export function createDatabaseInterface() {
  return {
    getExpense,
    getExpenseById,
    createExpense,
    deleteExpense,
  };
}
