import { lazy, Suspense } from "react";
import PageLoader from "@/shared/components/PageLoader";

const Scans = lazy(() => import("./pages/Scans"));

export const scansRoutes = [
  {
    path: "scans",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Scans />
      </Suspense>
    ),
  },
];
