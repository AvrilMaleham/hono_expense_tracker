import { hc } from "hono/client";
import type { AppType } from "../../../api/src/index";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = hc<AppType>(apiUrl);
