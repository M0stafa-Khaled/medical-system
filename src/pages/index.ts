import { lazy } from "react";

// ---- Settings
export const Settings = lazy(() => import("./dashboard/settings"));

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
