import { lazy } from "react";

// ---- Bookings
export const Bookings = lazy(
  () => import("../features/dashboard/bookings/pages/Bookings")
);
export const BookingDetails = lazy(
  () => import("../features/dashboard/bookings/pages/BookingDetails")
);
export const UpdateBooking = lazy(
  () => import("../features/dashboard/bookings/pages/UpdateBooking")
);
export const CreateBooking = lazy(
  () => import("../features/dashboard/bookings/pages/CreateBooking")
);
// ---- Doctors
export const Doctors = lazy(
  () => import("../features/dashboard/doctors/pages/Doctors")
);
export const DoctorDetails = lazy(
  () => import("../features/dashboard/doctors/pages/DoctorDetails")
);
export const CreateDoctor = lazy(
  () => import("../features/dashboard/doctors/pages/CreateDoctor")
);
export const UpdateDoctor = lazy(
  () => import("../features/dashboard/doctors/pages/UpdateDoctor")
);
export const CreateWorkingDay = lazy(
  () =>
    import("../features/dashboard/doctors/working-days/pages/CreateWorkingDay")
);
export const UpdateWorkingDay = lazy(
  () =>
    import("../features/dashboard/doctors/working-days/pages/UpdateWorkingDay")
);
// ---- Employees
export const Employees = lazy(
  () => import("../features/dashboard/employees/pages/Employees")
);
export const EmployeeDetails = lazy(
  () => import("../features/dashboard/employees/pages/EmployeeDetails")
);
export const CreateEmployee = lazy(
  () => import("../features/dashboard/employees/pages/CreateEmployee")
);
export const UpdateEmployee = lazy(
  () => import("../features/dashboard/employees/pages/UpdateEmployee")
);
// ---- Expenses
export const Expenses = lazy(
  () => import("../features/dashboard/expenses/pages/Expenses")
);
export const ExpenseDetails = lazy(
  () => import("../features/dashboard/expenses/pages/ExpenseDetails")
);
export const ExpensesCategories = lazy(
  () =>
    import("../features/dashboard/expenses-categories/pages/ExpensesCategories")
);
// ---- Patients
export const Patients = lazy(
  () => import("../features/dashboard/patients/pages/Patients")
);
export const PatientDetails = lazy(
  () => import("../features/dashboard/patients/pages/PatientDetails")
);
export const CreatePatient = lazy(
  () => import("../features/dashboard/patients/pages/CreatePatient")
);
export const UpdatePatient = lazy(
  () => import("../features/dashboard/patients/pages/UpdatePatient")
);
// ---- Prescriptions
export const Prescriptions = lazy(() => import("./dashboard/prescription"));
export const PrescriptionDetails = lazy(
  () => import("./dashboard/prescription/PrescriptionDetails")
);
export const CreatePrescription = lazy(
  () => import("./dashboard/prescription/CreatePrescription")
);
export const UpdatePrescription = lazy(
  () => import("./dashboard/prescription/UpdatePrescription")
);
// ---- Reports
export const BookingsReports = lazy(
  () => import("./dashboard/reports/bookingsReports")
);
export const ExpensesReports = lazy(
  () => import("./dashboard/reports/expensesReports")
);
export const PatientBalancesReports = lazy(
  () => import("./dashboard/reports/patientBalancesReports")
);
export const PatientsReports = lazy(
  () => import("./dashboard/reports/patientsReports")
);
export const PrescriptionsReports = lazy(
  () => import("./dashboard/reports/prescriptionsReports")
);
export const TransactionsReports = lazy(
  () => import("./dashboard/reports/transactionsReports")
);
export const TransfersReports = lazy(
  () => import("./dashboard/reports/transfersReports")
);
export const TreasuriesReports = lazy(
  () => import("./dashboard/reports/treasuriesReports")
);
// ---- Settings
export const Settings = lazy(() => import("./dashboard/settings"));
// ---- Transactions
export const Transactions = lazy(() => import("./dashboard/transactions"));
export const LastVisits = lazy(
  () => import("./dashboard/transactions/LastVisits")
);
export const TransactionDetails = lazy(
  () => import("./dashboard/transactions/TransactionDetails")
);
// ---- Treasuries
export const Treasuries = lazy(() => import("./dashboard/treasuries"));

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

// Shared
export const Dosages = lazy(() => import("./shared/dosages"));
export const Drugs = lazy(() => import("./shared/drugs"));
export const Scans = lazy(() => import("./shared/scans"));
export const Analysis = lazy(() => import("./shared/analysis"));

// Errors & NotFound
export const Error = lazy(() => import("./Error"));
export const NotFound = lazy(() => import("./NotFound"));
