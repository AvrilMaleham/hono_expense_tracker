import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/query-client";
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
        <header className="bg-gradient-to-r from-background via-muted/30 to-background border-b border-border/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-primary to-indigo-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">
                    PH
                  </span>
                </div>
                <span className="text-xl font-bold text-foreground">
                  Personal Hub
                </span>
              </div>
              <NavigationMenu>
                <NavigationMenuList className="gap-2">
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/"
                        className="px-4 py-2 rounded-md hover:bg-sky-secondary/50 font-medium text-sm transition-colors"
                      >
                        Home
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/expenses"
                        className="px-4 py-2 rounded-md hover:bg-sky-secondary/50 font-medium text-sm transition-colors"
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
      <TanStackRouterDevtools />
    </QueryClientProvider>
  ),
});
