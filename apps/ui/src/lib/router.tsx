import { createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "../routeTree.gen.js";

// Create a new router instance
export const router = createRouter({
  routeTree,
  defaultPreload: "intent", // Preload routes on hover
  defaultPreloadStaleTime: 0, // Always preload fresh data
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
