import PageLoader from "@/shared/components/PageLoader";
import { lazy, Suspense } from "react";

const Analysis = lazy(() => import("./pages/Analysis"));
export const analysisRoutes = [
  {
    path: "analysis",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Analysis />
      </Suspense>
    ),
  },
];
