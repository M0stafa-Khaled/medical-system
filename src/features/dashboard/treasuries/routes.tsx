import { PERMISSIONS } from "@/shared/enums/permissions";
import { ProtectedRoute } from "@/app/ProtectedRoute";
import { lazy, Suspense } from "react";
import PageLoader from "@/shared/components/PageLoader";

const Treasuries = lazy(() => import("./pages/Treasuries"));
const TransferBetweenTreasuries = lazy(
  () => import("./pages/TransferBetweenTreasuries")
);

export const treasuriesRoutes = [
  {
    path: "treasuries",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.TREASURIES}>
          <Treasuries />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "treasuries/transfers-between",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute
          requiredPermission={PERMISSIONS.TRANSFER_BETWEEN_TREASURIES}
        >
          <TransferBetweenTreasuries />
        </ProtectedRoute>
      </Suspense>
    ),
  },
];
