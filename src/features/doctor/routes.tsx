import { ProtectedRoute } from "@/app/ProtectedRoute";
import PageLoader from "@/shared/components/PageLoader";
import { lazy, Suspense } from "react";
import { doctorBookingsRoutes } from "./bookings/routes";
import { analysisRoutes } from "@/features/analysis";
import { drugsRoutes } from "@/features/drugs";
import { scansRoutes } from "@/features/scans";
import { dosagesRoutes } from "@/features/dosages";
import { doctorPrescriptionsRoutes } from "./prescriptions/routes";

const DoctorLayout = lazy(() => import("./layout"));
const DoctorDashboard = lazy(() => import("./pages/DoctorDashboard"));

export const doctorRoutes = [
  {
    path: "doctor",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredRole={"doctor"}>
          <DoctorLayout />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <DoctorDashboard />
          </Suspense>
        ),
      },
      ...doctorBookingsRoutes,
      ...doctorPrescriptionsRoutes,
      ...dosagesRoutes,
      ...scansRoutes,
      ...drugsRoutes,
      ...analysisRoutes,
    ],
  },
];
