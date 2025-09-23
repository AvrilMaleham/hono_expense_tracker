import { useExpenses } from "../hooks/useExpenses";

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
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>💰 Expense Tracker Dashboard</h1>
        <p>Track your expenses with Hono API + React + TanStack</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Expenses</h3>
          <div className="stat-value">{expenses.length}</div>
        </div>
        <div className="stat-card">
          <h3>Total Amount</h3>
          <div className="stat-value">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalAmount)}
          </div>
        </div>
        <div className="stat-card">
          <h3>Categories</h3>
          <div className="stat-value">{Object.keys(categoryTotals).length}</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-expenses">
          <h2>Recent Expenses</h2>
          {recentExpenses.length === 0 ? (
            <p>No expenses yet. Add your first expense!</p>
          ) : (
            <div className="recent-list">
              {recentExpenses.map((expense) => (
                <div key={expense.id} className="recent-item">
                  <div className="recent-main">
                    <span className="recent-description">
                      {expense.description}
                    </span>
                    <span className="recent-amount">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(expense.amount)}
                    </span>
                  </div>
                  <div className="recent-details">
                    <span className="recent-category">{expense.category}</span>
                    <span className="recent-date">{expense.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="category-breakdown">
          <h2>Spending by Category</h2>
          {Object.keys(categoryTotals).length === 0 ? (
            <p>No categories yet.</p>
          ) : (
            <div className="category-list">
              {Object.entries(categoryTotals).map(([category, amount]) => (
                <div key={category} className="category-item">
                  <span className="category-name">{category}</span>
                  <span className="category-amount">
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
