import { PERMISSIONS } from "@/enums/permissions";
import { ProtectedRoute } from "../auth";
import { Dosages } from "./pages/Dosages";

export const dosagesRoutes = [
  {
    path: "dosages",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.DOSAGES}>
        <Dosages />
      </ProtectedRoute>
    ),
  },
];
