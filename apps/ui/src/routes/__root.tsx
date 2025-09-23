import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import "../App.css";

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <header className="app-header">
          <nav className="app-nav">
            <Link to="/" className="nav-link">
              Dashboard
            </Link>
            <Link to="/expenses" className="nav-link">
              Expenses
            </Link>
          </nav>
        </header>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </QueryClientProvider>
  ),
});
