import { ProtectedRoute } from "@/app/ProtectedRoute";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { doctorsWorkingDaysRoute } from "./working-days";
import { lazy, Suspense } from "react";
import PageLoader from "@/shared/components/PageLoader";

const Doctors = lazy(() => import("./pages/Doctors"));
const DoctorDetails = lazy(() => import("./pages/DoctorDetails"));
const CreateDoctor = lazy(() => import("./pages/CreateDoctor"));
const UpdateDoctor = lazy(() => import("./pages/UpdateDoctor"));
const DoctorTransactions = lazy(() => import("./pages/DoctorTransactions"));

export const doctorsRoutes = [
  {
    path: "doctors",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.DOCTORS}>
          <Doctors />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "doctors/:doctorId",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_DOCTOR}>
          <DoctorDetails />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "doctors/create",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.ADD_DOCTOR}>
          <CreateDoctor />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "doctors/:doctorId/update",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_DOCTOR}>
          <UpdateDoctor />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "doctors/transactions",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.DOCTOR_TRANSACTIONS}>
          <DoctorTransactions />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  ...doctorsWorkingDaysRoute,
];
