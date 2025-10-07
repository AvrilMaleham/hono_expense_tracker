import { OpenAPIHono } from "@hono/zod-openapi";
import { healthCheckEndpoint } from "./get-health-check";
import { healthStatusEndpoint } from "./get-health-status";

const healthRouter = new OpenAPIHono()
  .openapi(
    healthCheckEndpoint.healthCheckRoute,
    healthCheckEndpoint.healthCheckHandler
  )
  .openapi(
    healthStatusEndpoint.healthStatusRoute,
    healthStatusEndpoint.healthStatusHandler
  );

export const healthRoutes = healthRouter;
