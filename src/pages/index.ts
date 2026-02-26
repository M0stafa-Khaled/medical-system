import { lazy } from "react";

// ---- Settings
export const Settings = lazy(() => import("./dashboard/settings"));
// Doctor
export const DoctorDashboard = lazy(() => import("./doctor"));
export const DoctorBookings = lazy(() => import("./doctor/bookings"));
export const DoctorClinics = lazy(() => import("./doctor/clinics"));
export const DoctorPrescriptions = lazy(() => import("./doctor/prescriptions"));
export const DoctorPrescriptionDetails = lazy(
  () => import("./doctor/prescriptions/DoctorPrescriptionDetails")
);
export const DoctorCreatePrescription = lazy(
  () => import("./doctor/prescriptions/DoctorCreatePrescription")
);
export const DoctorUpdatePrescription = lazy(
  () => import("./doctor/prescriptions/DoctorUpdatePrescription")
);

// Patient
export const PatientBookings = lazy(() => import("./patient/bookings"));
export const CreatePatientBooking = lazy(
  () => import("./patient/bookings/CreatePatientBooking")
);
export const UpdatePatientBooking = lazy(
  () => import("./patient/bookings/UpdatePatientBooking")
);

export const PatientBalances = lazy(() => import("./patient/balances"));

// Errors & NotFound
export const Error = lazy(() => import("./Error"));
export const NotFound = lazy(() => import("./NotFound"));
