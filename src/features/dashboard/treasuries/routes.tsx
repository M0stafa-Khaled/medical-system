import { PERMISSIONS } from "@/enums/permissions";
import { ProtectedRoute } from "@/features/auth";
import Treasuries from "./pages/Treasuries";

export const treasuriesRoutes = [
  {
    path: "treasuries",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.TREASURIES}>
        <Treasuries />
      </ProtectedRoute>
    ),
  },
];
