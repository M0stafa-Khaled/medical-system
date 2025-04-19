import { createRoutesFromElements, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinnerPage from "@/components/LoadingSpinnerPage";

const RootLayout = lazy(() => import("@/layout/RootLayout"));
const DoctorLayout = lazy(() => import("@/layout/DoctorLayout"));
const ProtectedRoute = lazy(() => import("@/components/auth/ProtectedRoute"));
const Doctor = lazy(() => import("@/pages/doctor"));
const Drugs = lazy(() => import("@/pages/drugs"));
const Analytics = lazy(() => import("@/pages/analytics"));
const Scans = lazy(() => import("@/pages/scans"));
const Dosages = lazy(() => import("@/pages/dosages"));
const DoctorPrescriptions = lazy(() => import("@/pages/doctor/prescriptions"));
const DoctorCreatePrescription = lazy(
  () => import("@/pages/doctor/prescriptions/DoctorCreatePrescription")
);
const DoctorUpdatePrescription = lazy(
  () => import("@/pages/doctor/prescriptions/DoctorUpdatePrescription")
);
const DoctorPrescriptionDetails = lazy(
  () => import("@/pages/doctor/prescriptions/DoctorPrescriptionDetails")
);

const doctorRoutes = createRoutesFromElements(
  <>
    <Route element={<RootLayout />} id="doctor-root">
      <Route
        path="/doctor"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredRole="doctor">
              <DoctorLayout />
            </ProtectedRoute>
          </Suspense>
        }
        id="doctor-layout"
      >
        <Route
          index
          element={
            <Suspense fallback={<LoadingSpinnerPage />}>
              <Doctor />
            </Suspense>
          }
          id="doctor"
        />

        {/* Prescriptions */}

        <Route
          path="prescriptions"
          element={
            <Suspense fallback={<LoadingSpinnerPage />}>
              <DoctorPrescriptions />
            </Suspense>
          }
          id="doctor-prescriptions"
        />
        <Route
          path="prescriptions/:prescriptionId"
          element={
            <Suspense fallback={<LoadingSpinnerPage />}>
              <DoctorPrescriptionDetails />
            </Suspense>
          }
          id="doctor-prescription-details"
        />
        <Route
          path="prescriptions/create"
          element={
            <Suspense fallback={<LoadingSpinnerPage />}>
              <DoctorCreatePrescription />
            </Suspense>
          }
          id="doctor-prescriptions-create"
        />
        <Route
          path="bookings/:bookingId/prescriptions/create"
          element={
            <Suspense fallback={<LoadingSpinnerPage />}>
              <DoctorCreatePrescription />
            </Suspense>
          }
          id="doctor-bookings-prescriptions-create"
        />
        <Route
          path="prescriptions/:prescriptionId/update"
          element={
            <Suspense fallback={<LoadingSpinnerPage />}>
              <DoctorUpdatePrescription />
            </Suspense>
          }
          id="doctor-prescriptions-update"
        />
        {/* Drugs */}
        <Route
          path="dosages"
          element={
            <Suspense fallback={<LoadingSpinnerPage />}>
              <Dosages />
            </Suspense>
          }
          id="doctor-dosages"
        />
        {/* Drugs */}
        <Route
          path="drugs"
          element={
            <Suspense fallback={<LoadingSpinnerPage />}>
              <Drugs />
            </Suspense>
          }
          id="doctor-drugs"
        />
        {/* Scans */}
        <Route
          path="scans"
          element={
            <Suspense fallback={<LoadingSpinnerPage />}>
              <Scans />
            </Suspense>
          }
          id="doctor-scans"
        />
        {/* Analysis */}
        <Route
          path="analytics"
          element={
            <Suspense fallback={<LoadingSpinnerPage />}>
              <Analytics />
            </Suspense>
          }
          id="doctor-analytics"
        />
      </Route>
    </Route>
  </>
);

export default doctorRoutes;
