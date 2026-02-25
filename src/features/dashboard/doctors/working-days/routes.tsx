import { PERMISSIONS } from "@/shared/enums/permissions";
import { ProtectedRoute } from "@/app/ProtectedRoute";
import { lazy, Suspense } from "react";
import PageLoader from "@/shared/components/PageLoader";

const CreateWorkingDay = lazy(() => import("./pages/CreateWorkingDay"));
const UpdateWorkingDay = lazy(() => import("./pages/UpdateWorkingDay"));

export const doctorsWorkingDaysRoute = [
  {
    path: "doctors/:doctorId/working-days/create",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.ADD_WORKING_DAY}>
          <CreateWorkingDay />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "doctors/:doctorId/working-days/:workingDayId/update",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_WORKING_DAY}>
          <UpdateWorkingDay />
        </ProtectedRoute>
      </Suspense>
    ),
  },
];
