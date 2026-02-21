import { lazy, Suspense } from "react";
import PageLoader from "@/shared/components/PageLoader";

const Drugs = lazy(() => import("./pages/Drugs"));

export const drugsRoutes = [
  {
    path: "drugs",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Drugs />
      </Suspense>
    ),
  },
];
