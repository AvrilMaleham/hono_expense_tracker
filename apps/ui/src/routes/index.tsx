import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/dashboardnew";

export const Route = createFileRoute("/")({
  component: Dashboard,
});
