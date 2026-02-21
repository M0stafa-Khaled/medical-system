import { PERMISSIONS } from "@/shared/enums/permissions";
import { ProtectedRoute } from "../auth";
import { lazy, Suspense } from "react";
import PageLoader from "@/shared/components/PageLoader";

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
