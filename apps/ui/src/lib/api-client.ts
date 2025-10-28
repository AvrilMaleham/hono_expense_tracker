import { hc } from "hono/client";
import type { AppType } from "../../../api/src/index";

const apiUrl = "/api";

export const api = hc<AppType>(apiUrl);
