// Mock database with in-memory storage
let mockExpenses = [
  {
    id: "1",
    description: "Coffee",
    amount: 4.5,
    category: "Food",
    date: "2024-01-15",
  },
  {
    id: "2",
    description: "Gas",
    amount: 45.0,
    category: "Transportation",
    date: "2024-01-14",
  },
  {
    id: "3",
    description: "Groceries",
    amount: 85.3,
    category: "Food",
    date: "2024-01-13",
  },
  {
    id: "4",
    description: "Electricity",
    amount: 100.0,
    category: "Bills",
    date: "2024-01-12",
  },
];

// Get all expenses
export const getExpense = () => {
  return {
    expenses: mockExpenses,
  };
};

// Get expense by ID
export const getExpenseById = (id: string) => {
  const expense = mockExpenses.find((exp) => exp.id === id);
  return expense ? { expense } : null;
};

// Create new expense
export const createExpense = (expenseData: {
  description: string;
  amount: number;
  category: string;
  date: string;
}) => {
  const maxId =
    mockExpenses.length > 0
      ? Math.max(...mockExpenses.map((exp) => parseInt(exp.id)))
      : 0;

  const newExpense = {
    id: (maxId + 1).toString(),
    ...expenseData,
  };
  mockExpenses.push(newExpense);
  return { message: "Expense created", expense: newExpense };
};

export const deleteExpense = (id: string) => {
  const expenseIndex = mockExpenses.findIndex((exp) => exp.id === id);
  if (expenseIndex === -1) {
    return null;
  }

  const deletedExpense = mockExpenses.splice(expenseIndex, 1)[0];
  return {
    message: `Expense ${id} deleted successfully`,
    expense: deletedExpense,
  };
};
