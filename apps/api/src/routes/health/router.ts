import { OpenAPIHono } from "@hono/zod-openapi";
import { healthCheckEndpoint } from "./get-health-check";
import { healthStatusEndpoint } from "./get-health-status";

const healthRouter = new OpenAPIHono();

healthRouter.openapi(
  healthCheckEndpoint.healthCheckRoute,
  healthCheckEndpoint.healthCheckHandler
);
healthRouter.openapi(
  healthStatusEndpoint.healthStatusRoute,
  healthStatusEndpoint.healthStatusHandler
);

export const healthRoutes = healthRouter;
