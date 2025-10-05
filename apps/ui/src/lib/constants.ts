export const EXPENSE_CATEGORIES = [
  {
    value: "food",
    label: "Food",
    color: "bg-amber-secondary",
    primaryColor: "bg-amber-primary",
  },
  {
    value: "transport",
    label: "Transport",
    color: "bg-fuchsia-secondary",
    primaryColor: "bg-fuchsia-primary",
  },
  {
    value: "housing",
    label: "Housing",
    color: "bg-indigo-secondary",
    primaryColor: "bg-indigo-primary",
  },
  {
    value: "other",
    label: "Other",
    color: "bg-sky-secondary",
    primaryColor: "bg-sky-primary",
  },
] as const;

// Helper function to get color for a category
export const getCategoryColor = (category: string): string => {
  return (
    EXPENSE_CATEGORIES.find((cat) => cat.value === category)?.color ||
    "bg-sky-secondary"
  );
};

// Helper function to get primary color for a category
export const getCategoryPrimaryColor = (category: string): string => {
  return (
    EXPENSE_CATEGORIES.find((cat) => cat.value === category)?.primaryColor ||
    "bg-sky-primary"
  );
};

// Helper function to get border color for a category
export const getCategoryBorderColor = (category: string): string => {
  const categoryData = EXPENSE_CATEGORIES.find((cat) => cat.value === category);
  if (!categoryData) return "border-l-sky-primary";

  switch (categoryData.value) {
    case "food":
      return "border-l-amber-primary";
    case "transport":
      return "border-l-fuchsia-primary";
    case "housing":
      return "border-l-indigo-primary";
    case "other":
      return "border-l-sky-primary";
    default:
      return "border-l-sky-primary";
  }
};
