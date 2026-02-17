import { ProtectedRoute } from "@/features/auth";
import Patients from "./pages/Patients";
import { PERMISSIONS } from "@/enums/permissions";
import PatientDetails from "./pages/PatientDetails";
import CreatePatient from "./pages/CreatePatient";
import UpdatePatient from "./pages/UpdatePatient";

export const patientsRoutes = [
  {
    path: "patients",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.PATIENTS}>
        <Patients />
      </ProtectedRoute>
    ),
  },
  {
    path: "patients/:patientId",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_PATIENT}>
        <PatientDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "patients/create",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.ADD_PATIENT}>
        <CreatePatient />
      </ProtectedRoute>
    ),
  },
  {
    path: "patients/:patientId/update",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_PATIENT}>
        <UpdatePatient />
      </ProtectedRoute>
    ),
  },
];
