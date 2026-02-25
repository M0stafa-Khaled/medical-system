import { PERMISSIONS } from "@/shared/enums/permissions";
import { lazy, Suspense } from "react";
import PageLoader from "@/shared/components/PageLoader";
import { ProtectedRoute } from "@/app/ProtectedRoute";

const Dosages = lazy(() => import("./pages/Dosages"));
export const dosagesRoutes = [
  {
    path: "dosages",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.DOSAGES}>
          <Dosages />
        </ProtectedRoute>
      </Suspense>
    ),
  },
];
