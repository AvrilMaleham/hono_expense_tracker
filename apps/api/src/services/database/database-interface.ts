import { getExpense } from "./get-expense";

export function createDatabaseInterface() {
  return {
    getExpense,
  };
}
