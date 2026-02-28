import { lazy, Suspense } from "react";
import { doctorClinicsRoutes } from "./clinics/routes";
import PageLoader from "@/shared/components/PageLoader";

const DoctorBookings = lazy(() => import("./pages/DoctorBookings"));

export const doctorBookingsRoutes = [
  ...doctorClinicsRoutes,
  {
    path: "clinics/bookings/:clinicId",
    element: (
      <Suspense fallback={<PageLoader />}>
        <DoctorBookings />
      </Suspense>
    ),
  },
];
