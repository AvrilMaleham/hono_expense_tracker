export const EXPENSE_CATEGORIES = [
  {
    value: "food",
    label: "Food",
    color: "bg-amber-secondary",
    borderColor: "border-l-amber-primary",
  },
  {
    value: "transport",
    label: "Transport",
    color: "bg-fuchsia-secondary",
    borderColor: "border-l-fuchsia-primary",
  },
  {
    value: "housing",
    label: "Housing",
    color: "bg-indigo-secondary",
    borderColor: "border-l-indigo-primary",
  },
  {
    value: "other",
    label: "Other",
    color: "bg-sky-secondary",
    borderColor: "border-l-sky-primary",
  },
] as const;

// Helper function to get color for a category
export const getCategoryColor = (category: string): string => {
  return (
    EXPENSE_CATEGORIES.find((cat) => cat.value === category)?.color ||
    "bg-sky-secondary"
  );
};

// Helper function to get border color for a category
export const getCategoryBorderColor = (category: string): string => {
  return (
    EXPENSE_CATEGORIES.find((cat) => cat.value === category)?.borderColor ||
    "border-sky-primary"
  );
};
