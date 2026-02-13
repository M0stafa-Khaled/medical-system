import { lazy } from "react";

// Landing Page
export const Landing = lazy(() => import("./landing"));

// Auth Pages
export const Login = lazy(() => import("./auth/Login"));
export const Register = lazy(() => import("./auth/Register"));
export const ForgotPassword = lazy(() => import("./auth/ForgotPassword"));
export const ResetPassword = lazy(() => import("./auth/ResetPassword"));
export const VerifyAccount = lazy(() => import("./auth/VerifyAccount"));

// Profile Pages
export const Profile = lazy(() => import("./profile"));

// Dashboard Pages
export const Dashboard = lazy(() => import("./dashboard"));
// ---- Bookings
export const Bookings = lazy(() => import("./dashboard/bookings"));
export const BookingDetails = lazy(
  () => import("./dashboard/bookings/BookingDetails")
);
export const UpdateBooking = lazy(
  () => import("./dashboard/bookings/UpdateBooking")
);
export const CreateBooking = lazy(
  () => import("./dashboard/bookings/CreateBooking")
);
// ---- Clinics
export const Clinics = lazy(() => import("./dashboard/clinics"));
// ---- Doctors
export const Doctors = lazy(() => import("./dashboard/doctors"));
export const DoctorDetails = lazy(
  () => import("./dashboard/doctors/DoctorDetails")
);
export const CreateDoctor = lazy(
  () => import("./dashboard/doctors/CreateDoctor")
);
export const UpdateDoctor = lazy(
  () => import("./dashboard/doctors/UpdateDoctor")
);
export const DoctorTabs = lazy(() => import("./dashboard/doctors/DoctorTabs"));
export const CreateWorkingDay = lazy(
  () => import("./dashboard/doctors/workingDays/CreateWorkingDay")
);
export const UpdateWorkingDay = lazy(
  () => import("./dashboard/doctors/workingDays/UpdateWorkingDay")
);
// ---- Employees
export const Employees = lazy(() => import("./dashboard/employees"));
export const EmployeeDetails = lazy(
  () => import("./dashboard/employees/EmployeeDetails")
);
export const CreateEmployee = lazy(
  () => import("./dashboard/employees/CreateEmployee")
);
export const UpdateEmployee = lazy(
  () => import("./dashboard/employees/UpdateEmployee")
);
// ---- Expenses
export const Expenses = lazy(() => import("./dashboard/expenses"));
export const ExpenseDetails = lazy(
  () => import("./dashboard/expenses/ExpenseDetails")
);
export const ExpensesCategories = lazy(
  () => import("./dashboard/expensesCategories")
);
// ---- Patients
export const Patients = lazy(() => import("./dashboard/patients"));
export const PatientDetails = lazy(
  () => import("./dashboard/patients/PatientDetails")
);
export const CreatePatient = lazy(
  () => import("./dashboard/patients/CreatePatient")
);
export const UpdatePatient = lazy(
  () => import("./dashboard/patients/UpdatePatient")
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
