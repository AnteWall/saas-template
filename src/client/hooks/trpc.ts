import type { AppRouter } from "../../server/trpc/router";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import {
  createTRPCReact,
  type inferReactQueryProcedureOptions,
} from "@trpc/react-query";
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export const trpc = createTRPCReact<AppRouter>();
