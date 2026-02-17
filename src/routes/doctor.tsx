import { createRoutesFromElements, Route } from "react-router";
import { lazy, Suspense } from "react";
import PageLoader from "@/components/shared/PageLoader";
import Error from "@/pages/Error";
import { ProtectedRoute } from "@/features/auth";

const RootLayout = lazy(() => import("@/shared/components/layouts/RootLayout"));
const DoctorLayout = lazy(
  () => import("@/shared/components/layouts/DoctorLayout")
);

const DoctorDashboard = lazy(() => import("@/pages/doctor"));
const DoctorClinics = lazy(() => import("@/pages/doctor/clinics"));
const DoctorBookings = lazy(() => import("@/pages/doctor/bookings"));
const Drugs = lazy(() => import("@/pages/shared/drugs"));
const Analysis = lazy(() => import("@/pages/shared/analysis"));
const Scans = lazy(() => import("@/features/scans/pages/Scans"));
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
    <Route element={<RootLayout />} id="doctor-root" errorElement={<Error />}>
      <Route
        path="/doctor"
        element={
          <Suspense fallback={<PageLoader />}>
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
            <Suspense fallback={<PageLoader />}>
              <DoctorDashboard />
            </Suspense>
          }
          id="doctor-dashboard"
        />
        <Route
          path="bookings"
          element={
            <Suspense fallback={<PageLoader />}>
              <DoctorClinics />
            </Suspense>
          }
          id="doctor-clinics"
        />

        <Route
          path="clinic/:clinicName/bookings"
          element={
            <Suspense fallback={<PageLoader />}>
              <DoctorBookings />
            </Suspense>
          }
          id="doctor-bookings"
        />

        {/* Prescriptions */}

        <Route
          path="prescriptions"
          element={
            <Suspense fallback={<PageLoader />}>
              <DoctorPrescriptions />
            </Suspense>
          }
          id="doctor-prescriptions"
        />
        <Route
          path="prescriptions/:prescriptionId"
          element={
            <Suspense fallback={<PageLoader />}>
              <DoctorPrescriptionDetails />
            </Suspense>
          }
          id="doctor-prescription-details"
        />
        <Route
          path="prescriptions/create"
          element={
            <Suspense fallback={<PageLoader />}>
              <DoctorCreatePrescription />
            </Suspense>
          }
          id="doctor-prescriptions-create"
        />
        <Route
          path="bookings/:bookingId/prescriptions/create"
          element={
            <Suspense fallback={<PageLoader />}>
              <DoctorCreatePrescription />
            </Suspense>
          }
          id="doctor-bookings-prescriptions-create"
        />
        <Route
          path="prescriptions/:prescriptionId/update"
          element={
            <Suspense fallback={<PageLoader />}>
              <DoctorUpdatePrescription />
            </Suspense>
          }
          id="doctor-prescriptions-update"
        />
        {/* Drugs */}
        <Route
          path="dosages"
          element={
            <Suspense fallback={<PageLoader />}>{/* <Dosages /> */}</Suspense>
          }
          id="doctor-dosages"
        />
        {/* Drugs */}
        <Route
          path="drugs"
          element={
            <Suspense fallback={<PageLoader />}>
              <Drugs />
            </Suspense>
          }
          id="doctor-drugs"
        />
        {/* Scans */}
        <Route
          path="scans"
          element={
            <Suspense fallback={<PageLoader />}>
              <Scans />
            </Suspense>
          }
          id="doctor-scans"
        />
        {/* Analysis */}
        <Route
          path="analytics"
          element={
            <Suspense fallback={<PageLoader />}>
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
