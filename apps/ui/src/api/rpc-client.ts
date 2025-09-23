import { hc } from "hono/client";
import type { AppType } from "../../../api/src/rpc";

// Create the RPC client
export const api = hc<AppType>("http://localhost:3000");

// Export the client for use in components
export default api;
