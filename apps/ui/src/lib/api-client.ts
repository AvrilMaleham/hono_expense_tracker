import { hc } from "hono/client";
import type { AppType } from "../../../api/src/index";

const apiUrl = "http://localhost:3000";

export const api = hc<AppType>(apiUrl);
