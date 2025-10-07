import { OpenAPIHono } from "@hono/zod-openapi";
import { getExpensesEndpoint } from "./get-expenses";
import { getExpenseByIdEndpoint } from "./get-expense-by-id";
import { postExpensesEndpoint } from "./post-expenses";
import { deleteExpenseEndpoint } from "./delete-expenses";
import type { HonoEnv } from "../../config/hono-context";

const expensesRouter = new OpenAPIHono<HonoEnv>()
  .openapi(
    getExpensesEndpoint.getExpensesRoute,
    getExpensesEndpoint.getExpensesHandler
  )
  .openapi(
    getExpenseByIdEndpoint.getExpenseByIdRoute,
    getExpenseByIdEndpoint.getExpenseByIdHandler
  )
  .openapi(
    postExpensesEndpoint.postExpensesRoute,
    postExpensesEndpoint.postExpensesHandler
  )
  .openapi(
    deleteExpenseEndpoint.deleteExpenseRoute,
    deleteExpenseEndpoint.deleteExpenseHandler
  );

export const expensesRoutes = expensesRouter;
