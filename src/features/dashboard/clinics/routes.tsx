import { PERMISSIONS } from "@/shared/enums/permissions";
import { ProtectedRoute } from "@/app/ProtectedRoute";
import { lazy, Suspense } from "react";
import PageLoader from "@/shared/components/PageLoader";

const Clinics = lazy(() => import("./pages/Clinics"));

export const clinicsRoutes = [
  {
    path: "clinics",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.CLINICS}>
          <Clinics />
        </ProtectedRoute>
      </Suspense>
    ),
  },
];
