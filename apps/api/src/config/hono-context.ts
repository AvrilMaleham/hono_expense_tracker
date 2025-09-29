import type { createDatabaseInterface } from "../services/database/database-interface";

export type HonoVariables = {
  db: ReturnType<typeof createDatabaseInterface>;
};

export type HonoEnv = {
  Variables: HonoVariables;
};
