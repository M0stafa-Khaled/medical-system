import { ProtectedRoute } from "@/app/ProtectedRoute";
import PageLoader from "@/shared/components/PageLoader";
import { lazy, Suspense } from "react";

const PatientLayout = lazy(() => import("./layout"));
const PatientOverview = lazy(() => import("./overview/pages/PatientOverview"));
const PatientBookings = lazy(() => import("./bookings/pages/PatientBookings"));
const CreatePatientBooking = lazy(
  () => import("./bookings/pages/CreatePatientBooking")
);
const PatientBookingDetails = lazy(
  () => import("./bookings/pages/PatientBookingDetails")
);
const UpdatePatientBooking = lazy(
  () => import("./bookings/pages/UpdatePatientBooking")
);
const PatientBalancesPage = lazy(
  () => import("./balances/pages/PatientBalancesPage")
);
const PatientProfile = lazy(() => import("./profile/pages/PatientProfile"));

export const patientRoutes = [
  {
    path: "patient",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredRole={["patient"]}>
          <PatientLayout />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <PatientOverview />
          </Suspense>
        ),
      },
      {
        path: "bookings",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PatientBookings />
          </Suspense>
        ),
      },
      {
        path: "bookings/create",
        element: (
          <Suspense fallback={<PageLoader />}>
            <CreatePatientBooking />
          </Suspense>
        ),
      },
      {
        path: "bookings/:bookingId",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PatientBookingDetails />
          </Suspense>
        ),
      },
      {
        path: "bookings/:bookingId/edit",
        element: (
          <Suspense fallback={<PageLoader />}>
            <UpdatePatientBooking />
          </Suspense>
        ),
      },
      {
        path: "balances",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PatientBalancesPage />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PatientProfile />
          </Suspense>
        ),
      },
    ],
  },
];
