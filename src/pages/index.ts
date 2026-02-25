import { lazy } from "react";

// ---- Reports
export const BookingsReports = lazy(
  () => import("../features/dashboard/reports/pages/BookingsReports")
);
export const ExpensesReports = lazy(
  () => import("../features/dashboard/reports/pages/ExpensesReports")
);
export const PatientBalancesReports = lazy(
  () => import("./dashboard/reports/patientBalancesReports")
);
export const PatientsReports = lazy(
  () => import("../features/dashboard/reports/pages/PatientsReports")
);
export const PrescriptionsReports = lazy(
  () => import("./dashboard/reports/prescriptionsReports")
);
export const TransactionsReports = lazy(
  () => import("../features/dashboard/reports/pages/TransactionsReports")
);
export const TransfersReports = lazy(
  () => import("../features/dashboard/reports/pages/TransfersReports")
);
export const TreasuriesReports = lazy(
  () => import("../features/dashboard/reports/pages/TreasuriesReports")
);
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
