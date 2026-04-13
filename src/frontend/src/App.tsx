import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy pages
const HomePage = lazy(() =>
  import("@/pages/Home").then((m) => ({ default: m.HomePage })),
);
const SubmitPage = lazy(() =>
  import("@/pages/Submit").then((m) => ({ default: m.SubmitPage })),
);
const WebsiteDetailPage = lazy(() =>
  import("@/pages/WebsiteDetail").then((m) => ({
    default: m.WebsiteDetailPage,
  })),
);

// Loading fallback
function PageLoader() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-12 space-y-6">
      <Skeleton className="h-10 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-64 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// Routes
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const submitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/submit",
  component: SubmitPage,
});

const websiteDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/website/$id",
  component: WebsiteDetailPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  submitRoute,
  websiteDetailRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </>
  );
}
