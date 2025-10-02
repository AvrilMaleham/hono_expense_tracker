import { useExpenses } from "../hooks/use-expenses";

export function Dashboard() {
  const { data, isLoading, error } = useExpenses();

  if (isLoading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        {error.message || "Failed to load dashboard data"}
      </div>
    );
  }

  const expenses = data?.expenses || [];
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const categoryTotals = expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  const recentExpenses = expenses
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div>
      <div>
        <h1>💰 Expense Tracker Dashboard</h1>
        <p>Track your expenses with Hono API + React + TanStack</p>
      </div>

      <div>
        <div>
          <h3>Total Expenses</h3>
          <div>{expenses.length}</div>
        </div>
        <div>
          <h3>Total Amount</h3>
          <div>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalAmount)}
          </div>
        </div>
        <div>
          <h3>Categories</h3>
          <div>{Object.keys(categoryTotals).length}</div>
        </div>
      </div>

      <div>
        <div>
          <h2>Recent Expenses</h2>
          {recentExpenses.length === 0 ? (
            <p>No expenses yet. Add your first expense!</p>
          ) : (
            <div>
              {recentExpenses.map((expense) => (
                <div key={expense.id}>
                  <div>
                    <span>{expense.description}</span>
                    <span>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(expense.amount)}
                    </span>
                  </div>
                  <div>
                    <span>{expense.category}</span>
                    <span>{expense.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2>Spending by Category</h2>
          {Object.keys(categoryTotals).length === 0 ? (
            <p>No categories yet.</p>
          ) : (
            <div>
              {Object.entries(categoryTotals).map(([category, amount]) => (
                <div key={category}>
                  <span>{category}</span>
                  <span>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
