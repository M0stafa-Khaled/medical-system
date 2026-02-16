import { PERMISSIONS } from "@/enums/permissions";
import { ProtectedRoute } from "@/features/auth";
import CreateWorkingDay from "./pages/CreateWorkingDay";
import UpdateWorkingDay from "./pages/UpdateWorkingDay";

export const doctorsWorkingDaysRoute = [
  {
    path: "doctors/:doctorId/working-days/create",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.ADD_WORKING_DAY}>
        <CreateWorkingDay />
      </ProtectedRoute>
    ),
  },
  {
    path: "doctors/:doctorId/working-days/:workingDayId/update",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_WORKING_DAY}>
        <UpdateWorkingDay />
      </ProtectedRoute>
    ),
  },
];
