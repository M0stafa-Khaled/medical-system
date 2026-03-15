import PageLoader from "@/shared/components/PageLoader";
import { lazy, Suspense } from "react";

const Settings = lazy(() => import("./pages/Settings"));

export const settingsRoutes = [
  {
    path: "settings",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Settings />
      </Suspense>
    ),
  },
];
