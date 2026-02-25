import { ProtectedRoute } from "@/app/ProtectedRoute";
import PageLoader from "@/shared/components/PageLoader";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { lazy, Suspense } from "react";

const Patients = lazy(() => import("./pages/Patients"));
const PatientDetails = lazy(() => import("./pages/PatientDetails"));
const CreatePatient = lazy(() => import("./pages/CreatePatient"));
const UpdatePatient = lazy(() => import("./pages/UpdatePatient"));

export const patientsRoutes = [
  {
    path: "patients",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.PATIENTS}>
          <Patients />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "patients/:patientId",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_PATIENT}>
          <PatientDetails />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "patients/create",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.ADD_PATIENT}>
          <CreatePatient />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "patients/:patientId/update",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_PATIENT}>
          <UpdatePatient />
        </ProtectedRoute>
      </Suspense>
    ),
  },
];
