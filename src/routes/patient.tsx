import { createRoutesFromElements, Route } from "react-router";
import { lazy, Suspense } from "react";
import PageLoader from "@/components/shared/PageLoader";
import Error from "@/pages/Error";

const RootLayout = lazy(() => import("@/layout/RootLayout"));
const PatientLayout = lazy(() => import("@/layout/PatientLayout"));
const ProtectedRoute = lazy(() => import("@/components/auth/ProtectedRoute"));

const PatientBookings = lazy(() => import("@/pages/patient/bookings"));
const CreatePatientBooking = lazy(
  () => import("@/pages/patient/bookings/CreatePatientBooking")
);
const UpdatePatientBooking = lazy(
  () => import("@/pages/patient/bookings/UpdatePatientBooking")
);
const PatientBalances = lazy(() => import("@/pages/patient/balances"));

const patientRoutes = createRoutesFromElements(
  <>
    <Route element={<RootLayout />} id="patient-root" errorElement={<Error />}>
      <Route
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute requiredRole="patient">
              <PatientLayout />
            </ProtectedRoute>
          </Suspense>
        }
        id="patient-layout"
      >
        {/* Bookings */}
        <Route
          path="/bookings"
          element={
            <Suspense fallback={<PageLoader />}>
              <PatientBookings />
            </Suspense>
          }
          id="patient-bookings"
        />

        <Route
          path="/bookings/create"
          element={
            <Suspense fallback={<PageLoader />}>
              <CreatePatientBooking />
            </Suspense>
          }
          id="patient-create-booking"
        />
        <Route
          path="/bookings/:bookingId/update"
          element={
            <Suspense fallback={<PageLoader />}>
              <UpdatePatientBooking />
            </Suspense>
          }
          id="patient-update-booking"
        />

        {/* Balances */}
        <Route
          path="/balances"
          element={
            <Suspense fallback={<PageLoader />}>
              <PatientBalances />
            </Suspense>
          }
          id="patient-balances"
        />
      </Route>
    </Route>
  </>
);

export default patientRoutes;
