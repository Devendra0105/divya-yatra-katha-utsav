/*  ──────────────────────────────────────────────────────────────
    src/routes/__root.tsx
   ────────────────────────────────────────────────────────────── */

import { QueryClientProvider } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";

import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";

import { useEffect, type ReactNode } from "react";

import BackgroundMusic from "@/components/BackgroundMusic";
import { SiteFrame } from "@/components/site-chrome";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

/* --------------------------------------------------------------
   Helper components (404, error page, etc.)
   -------------------------------------------------------------- */
function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, {
      boundary: "tanstack_root_error_component",
    });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back
          home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------
   Root layout (HTML document shell)
   -------------------------------------------------------------- */
function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="hi">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/* --------------------------------------------------------------
   The actual UI that the router renders (wraps Outlet with
   QueryClientProvider and our site frame)
   -------------------------------------------------------------- */
function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Global soft background music */}
      <BackgroundMusic />

      {/* Site header/footer wrapper */}
      <SiteFrame>
        {/* All child routes render here */}
        <Outlet />
      </SiteFrame>
    </QueryClientProvider>
  );
}

/* --------------------------------------------------------------
   Export the TanStack Router root route (with context)
   -------------------------------------------------------------- */
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { name: "theme-color", content: "#fed7ae" },
      { title: "दिव्य यात्रा — संगीतमय श्रीमद् भागवत कथा" },
      {
        name: "description",
        content:
          "जगन्नाथपुरी एवं गंगासागर तीर्थ क्षेत्र की संगीतमय श्रीमद् भागवत कथा का पावन आमंत्रण।",
      },
      { property: "og:title", content: "दिव्य यात्रा — संगीतमय श्रीमद् भागवत कथा" },
      {
        property: "og:description",
        content:
          "जगन्नाथपुरी एवं गंगासागर तीर्थ क्षेत्र की संगीतमय श्रीमद् भागवत कथा का पावन आमंत्रण।",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      {
        rel: "preload",
        as: "image",
        href: "/background.jpg",
        fetchPriority: "high",
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=Yatra+One&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/* --------------------------------------------------------------
   Optional default export – some codebases import a “Root”
   component directly (e.g., for testing). It simply renders the
   same UI as the router route.
   -------------------------------------------------------------- */
export default function Root() {
  return <RootComponent />;
}