/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as api_ from "../api.js";
import type * as auth from "../auth.js";
import type * as http from "../http.js";
import type * as konverse from "../konverse.js";
import type * as konverseAI from "../konverseAI.js";
import type * as konverseAIActions from "../konverseAIActions.js";
import type * as konverseActions from "../konverseActions.js";
import type * as konverseMutations from "../konverseMutations.js";
import type * as konverseQueries from "../konverseQueries.js";
import type * as users from "../users.js";
import type * as usersActions from "../usersActions.js";
import type * as usersMutations from "../usersMutations.js";
import type * as usersQueries from "../usersQueries.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  api: typeof api_;
  auth: typeof auth;
  http: typeof http;
  konverse: typeof konverse;
  konverseAI: typeof konverseAI;
  konverseAIActions: typeof konverseAIActions;
  konverseActions: typeof konverseActions;
  konverseMutations: typeof konverseMutations;
  konverseQueries: typeof konverseQueries;
  users: typeof users;
  usersActions: typeof usersActions;
  usersMutations: typeof usersMutations;
  usersQueries: typeof usersQueries;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
