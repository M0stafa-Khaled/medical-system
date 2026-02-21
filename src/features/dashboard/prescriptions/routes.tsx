import { ProtectedRoute } from "@/features/auth";
import PageLoader from "@/shared/components/PageLoader";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { lazy, Suspense } from "react";

const Prescriptions = lazy(() => import("./pages/Prescriptions"));
const PrescriptionDetails = lazy(() => import("./pages/PrescriptionDetails"));
const CreatePrescription = lazy(() => import("./pages/CreatePrescription"));
const UpdatePrescription = lazy(() => import("./pages/UpdatePrescription"));

export const prescriptionsRoutes = [
  {
    path: "prescriptions",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.PRESCRIPTIONS}>
          <Prescriptions />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "prescriptions/:prescriptionId",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_PRESCRIPTION}>
          <PrescriptionDetails />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "prescriptions/create",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.ADD_PRESCRIPTION}>
          <CreatePrescription />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "prescriptions/:prescriptionId/update",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_PRESCRIPTION}>
          <UpdatePrescription />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "bookings/:bookingId/prescriptions/create",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.ADD_PRESCRIPTION}>
          <CreatePrescription />
        </ProtectedRoute>
      </Suspense>
    ),
  },
];
