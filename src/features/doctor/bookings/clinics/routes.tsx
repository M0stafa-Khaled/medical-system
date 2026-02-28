import PageLoader from "@/shared/components/PageLoader";
import { lazy, Suspense } from "react";

const DoctorClinics = lazy(() => import("./pages/DoctorClinics"));

export const doctorClinicsRoutes = [
  {
    path: "bookings",
    element: (
      <Suspense fallback={<PageLoader />}>
        <DoctorClinics />
      </Suspense>
    ),
  },
];
