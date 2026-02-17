import { PERMISSIONS } from "@/enums/permissions";
import { ProtectedRoute } from "@/features/auth";
import Clinics from "./pages/Clinics";

export const clinicsRoutes = [
  {
    path: "clinics",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.CLINICS}>
        <Clinics />
      </ProtectedRoute>
    ),
  },
];
