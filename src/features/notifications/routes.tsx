import { ProtectedRoute } from "@/app/ProtectedRoute";
import PageLoader from "@/shared/components/PageLoader";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { lazy, Suspense } from "react";

const Notifications = lazy(() => import("./pages/Notifications"));
export const notificationsRoutes = [
  {
    path: "notifications",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.RECEIVE_NOTIFICATIONS}>
          <Notifications />
        </ProtectedRoute>
      </Suspense>
    ),
  },
];
