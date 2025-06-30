import { createRoutesFromElements, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import SuspenseLoader from "@/components/shared/SuspenseLoader";

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
    <Route element={<RootLayout />} id="patient-root">
      <Route
        element={
          <Suspense fallback={<SuspenseLoader />}>
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
            <Suspense fallback={<SuspenseLoader />}>
              <PatientBookings />
            </Suspense>
          }
          id="patient-bookings"
        />

        <Route
          path="/bookings/create"
          element={
            <Suspense fallback={<SuspenseLoader />}>
              <CreatePatientBooking />
            </Suspense>
          }
          id="patient-create-booking"
        />
        <Route
          path="/bookings/:bookingId/update"
          element={
            <Suspense fallback={<SuspenseLoader />}>
              <UpdatePatientBooking />
            </Suspense>
          }
          id="patient-update-booking"
        />

        {/* Balances */}
        <Route
          path="/balances"
          element={
            <Suspense fallback={<SuspenseLoader />}>
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
