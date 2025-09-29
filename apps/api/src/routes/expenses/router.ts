import { OpenAPIHono } from "@hono/zod-openapi";
import { getExpensesEndpoint } from "./get-expenses";
import { getExpenseByIdEndpoint } from "./get-expense-by-id";
import { postExpensesEndpoint } from "./post-expenses";
import { deleteExpenseEndpoint } from "./delete-expenses";

const expensesRouter = new OpenAPIHono();

expensesRouter.openapi(
  getExpensesEndpoint.getExpensesRoute,
  getExpensesEndpoint.getExpensesHandler
);
expensesRouter.openapi(
  getExpenseByIdEndpoint.getExpenseByIdRoute,
  getExpenseByIdEndpoint.getExpenseByIdHandler
);
expensesRouter.openapi(
  postExpensesEndpoint.postExpensesRoute,
  postExpensesEndpoint.postExpensesHandler
);
expensesRouter.openapi(
  deleteExpenseEndpoint.deleteExpenseRoute,
  deleteExpenseEndpoint.deleteExpenseHandler
);

export const expensesRoutes = expensesRouter;
