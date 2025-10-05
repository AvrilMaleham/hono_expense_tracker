import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/query-client";
import { Toaster } from "sonner";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <div>
        <header className="border-b border-border/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-foreground">
                Personal Hub
              </span>

              <NavigationMenu>
                <NavigationMenuList className="gap-2">
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/"
                        className="px-4 py-2 font-medium text-sm text-muted-foreground hover:text-foreground"
                      >
                        Home
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/expenses"
                        className="px-4 py-2 font-medium text-sm text-muted-foreground hover:text-foreground"
                      >
                        Expenses
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
      <Toaster />
      <TanStackRouterDevtools />
    </QueryClientProvider>
  ),
});
