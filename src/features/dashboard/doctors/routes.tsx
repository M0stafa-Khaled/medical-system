import { ProtectedRoute } from "@/features/auth";
import Doctors from "./pages/Doctors";
import { PERMISSIONS } from "@/enums/permissions";
import DoctorDetails from "./pages/DoctorDetails";
import UpdateDoctor from "./pages/UpdateDoctor";
import CreateDoctor from "./pages/CreateDoctor";
import { doctorsWorkingDaysRoute } from "./working-days";

export const doctorsRoutes = [
  {
    path: "doctors",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.DOCTORS}>
        <Doctors />
      </ProtectedRoute>
    ),
  },
  {
    path: "doctors/:doctorId",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_DOCTOR}>
        <DoctorDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "doctors/create",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.ADD_DOCTOR}>
        <CreateDoctor />
      </ProtectedRoute>
    ),
  },
  {
    path: "doctors/:doctorId/update",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_DOCTOR}>
        <UpdateDoctor />
      </ProtectedRoute>
    ),
  },
  ...doctorsWorkingDaysRoute,
];
