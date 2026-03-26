import { ProtectedRoute } from "@/app/ProtectedRoute";
import PageLoader from "@/shared/components/PageLoader";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { lazy, Suspense } from "react";

const DailySummary = lazy(() => import("./pages/DailySummary"));

export const dailySummaryRoutes = [
  {
    path: "daily-summary",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.MASTER_DATA}>
          <DailySummary />
        </ProtectedRoute>
      </Suspense>
    ),
  },
];
