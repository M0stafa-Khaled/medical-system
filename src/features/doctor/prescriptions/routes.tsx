import PageLoader from "@/shared/components/PageLoader";
import { lazy, Suspense } from "react";

const DoctorPrescriptions = lazy(() => import("./pages/DoctorPrescriptions"));
const DoctorPrescriptionDetails = lazy(
  () => import("./pages/DoctorPrescriptionDetails")
);
const DoctorCreatePrescription = lazy(
  () => import("./pages/DoctorCreatePrescription")
);
const DoctorUpdatePrescription = lazy(
  () => import("./pages/DoctorUpdatePrescription")
);

export const doctorPrescriptionsRoutes = [
  {
    path: "prescriptions",
    element: (
      <Suspense fallback={<PageLoader />}>
        <DoctorPrescriptions />
      </Suspense>
    ),
  },
  {
    path: "prescriptions/:prescriptionId",
    element: (
      <Suspense fallback={<PageLoader />}>
        <DoctorPrescriptionDetails />
      </Suspense>
    ),
  },
  {
    path: "prescriptions/create",
    element: (
      <Suspense fallback={<PageLoader />}>
        <DoctorCreatePrescription />
      </Suspense>
    ),
  },
  {
    path: "bookings/:bookingId/prescriptions/create",
    element: (
      <Suspense fallback={<PageLoader />}>
        <DoctorCreatePrescription />
      </Suspense>
    ),
  },
  {
    path: "prescriptions/:prescriptionId/update",
    element: (
      <Suspense fallback={<PageLoader />}>
        <DoctorUpdatePrescription />
      </Suspense>
    ),
  },
];
