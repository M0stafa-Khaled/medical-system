import { createRoutesFromElements, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinnerPage from "@/components/LoadingSpinnerPage";

const RootLayout = lazy(() => import("@/layout/RootLayout"));
const DoctorLayout = lazy(() => import("@/layout/DoctorLayout"));
const ProtectedRoute = lazy(() => import("@/components/auth/ProtectedRoute"));
const DoctorDashboard = lazy(() => import("@/pages/doctor"));
const DoctorClinics = lazy(() => import("@/pages/doctor/clinics"));
const DoctorBookings = lazy(() => import("@/pages/doctor/bookings"));
const Drugs = lazy(() => import("@/pages/main/drugs"));
const Analysis = lazy(() => import("@/pages/main/analysis"));
const Scans = lazy(() => import("@/pages/main/scans"));
const Dosages = lazy(() => import("@/pages/main/dosages"));
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
              <DoctorDashboard />
            </Suspense>
          }
          id="doctor-dashboard"
        />
        <Route
          path="bookings"
          element={
            <Suspense fallback={<LoadingSpinnerPage />}>
              <DoctorClinics />
            </Suspense>
          }
          id="doctor-clinics"
        />

        <Route
          path="clinic/:clinicName/bookings"
          element={
            <Suspense fallback={<LoadingSpinnerPage />}>
              <DoctorBookings />
            </Suspense>
          }
          id="doctor-bookings"
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
              <Analysis />
            </Suspense>
          }
          id="doctor-analytics"
        />
      </Route>
    </Route>
  </>
);

export default doctorRoutes;
