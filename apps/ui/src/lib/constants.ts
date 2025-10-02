export const EXPENSE_CATEGORIES = [
  { value: "food", label: "Food", color: "bg-amber-secondary" },
  { value: "transport", label: "Transport", color: "bg-sky-secondary" },
  { value: "housing", label: "Housing", color: "bg-indigo-secondary" },
  { value: "other", label: "Other", color: "bg-fuchsia-secondary" },
] as const;

// Helper function to get color for a category
export const getCategoryColor = (category: string): string => {
  return (
    EXPENSE_CATEGORIES.find((cat) => cat.value === category)?.color ||
    "bg-fuchsia-secondary"
  );
};
