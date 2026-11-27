/*  ──────────────────────────────────────────────────────────────
    src/router.tsx
   ────────────────────────────────────────────────────────────── */

import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/* -----------------------------------------------------------------
   Use an alias for the imported class to avoid a name clash with the
   `QueryClient` type that is imported elsewhere (e.g. in __root.tsx).
   ----------------------------------------------------------------- */
import { QueryClient as TanstackQueryClient } from "@tanstack/react-query";

/**
 * Returns a **new** router instance for every request (SSR‑safe).
 * The router’s context contains a freshly‑created TanStack Query client,
 * which is then consumed inside `src/routes/__root.tsx`.
 */
export const getRouter = () => {
  const queryClient = new TanstackQueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};