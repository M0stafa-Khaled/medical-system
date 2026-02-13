// Auth Pages
export { default as Login } from "./auth/Login";
export { default as Register } from "./auth/Register";
export { default as ForgotPassword } from "./auth/ForgotPassword";
export { default as ResetPassword } from "./auth/ResetPassword";
export { default as VerifyAccount } from "./auth/VerifyAccount";

// Profile Pages
export { default as Profile } from "./profile";

// Dashboard Pages
export { default as Dashboard } from "./dashboard";
// ---- Bookings
export { default as Bookings } from "./dashboard/bookings";
export { default as BookingDetails } from "./dashboard/bookings/BookingDetails";
export { default as UpdateBooking } from "./dashboard/bookings/UpdateBooking";
export { default as CreateBooking } from "./dashboard/bookings/CreateBooking";
// ---- Clinics
export { default as Clinics } from "./dashboard/clinics";
// ---- Doctors
export { default as Doctors } from "./dashboard/doctors";
export { default as DoctorDetails } from "./dashboard/doctors/DoctorDetails";
export { default as CreateDoctor } from "./dashboard/doctors/CreateDoctor";
export { default as UpdateDoctor } from "./dashboard/doctors/UpdateDoctor";
export { default as DoctorTabs } from "./dashboard/doctors/DoctorTabs";
export { default as CreateWorkingDay } from "./dashboard/doctors/workingDays/CreateWorkingDay";
export { default as UpdateWorkingDay } from "./dashboard/doctors/workingDays/UpdateWorkingDay";
// ---- Employees
export { default as Employees } from "./dashboard/employees";
export { default as EmployeeDetails } from "./dashboard/employees/EmployeeDetails";
export { default as CreateEmployee } from "./dashboard/employees/CreateEmployee";
export { default as UpdateEmployee } from "./dashboard/employees/UpdateEmployee";
// ---- Expenses
export { default as Expenses } from "./dashboard/expenses";
export { default as ExpenseDetails } from "./dashboard/expenses/ExpenseDetails";
export { default as ExpensesCategories } from "./dashboard/expensesCategories";
// ---- Patients
export { default as Patients } from "./dashboard/patients";
export { default as PatientDetails } from "./dashboard/patients/PatientDetails";
export { default as CreatePatient } from "./dashboard/patients/CreatePatient";
export { default as UpdatePatient } from "./dashboard/patients/UpdatePatient";
// ---- Prescriptions
export { default as Prescriptions } from "./dashboard/prescription";
export { default as PrescriptionDetails } from "./dashboard/prescription/PrescriptionDetails";
export { default as CreatePrescription } from "./dashboard/prescription/CreatePrescription";
export { default as UpdatePrescription } from "./dashboard/prescription/UpdatePrescription";
// ---- Reports
export { default as BookingsReports } from "./dashboard/reports/bookingsReports";
export { default as ExpensesReports } from "./dashboard/reports/expensesReports";
export { default as PatientBalancesReports } from "./dashboard/reports/patientBalancesReports";
export { default as PatientsReports } from "./dashboard/reports/patientsReports";
export { default as PrescriptionsReports } from "./dashboard/reports/prescriptionsReports";
export { default as TransactionsReports } from "./dashboard/reports/transactionsReports";
export { default as TransfersReports } from "./dashboard/reports/transfersReports";
export { default as TreasuriesReports } from "./dashboard/reports/treasuriesReports";
// ---- Settings
export { default as Settings } from "./dashboard/settings";
// ---- Transactions
export { default as Transactions } from "./dashboard/transactions";
export { default as LastVisits } from "./dashboard/transactions/LastVisits";
export { default as TransactionDetails } from "./dashboard/transactions/TransactionDetails";
// ---- Treasuries
export { default as Treasuries } from "./dashboard/treasuries";

// Doctor
export { default as DoctorDashboard } from "./doctor";
export { default as DoctorBookings } from "./doctor/bookings";
export { default as DoctorClinics } from "./doctor/clinics";
export { default as DoctorPrescriptions } from "./doctor/prescriptions";
export { default as DoctorPrescriptionDetails } from "./doctor/prescriptions/DoctorPrescriptionDetails";
export { default as DoctorCreatePrescription } from "./doctor/prescriptions/DoctorCreatePrescription";
export { default as DoctorUpdatePrescription } from "./doctor/prescriptions/DoctorUpdatePrescription";

// Patient
export { default as PatientBookings } from "./patient/bookings";
export { default as CreatePatientBooking } from "./patient/bookings/CreatePatientBooking";
export { default as UpdatePatientBooking } from "./patient/bookings/UpdatePatientBooking";

export { default as PatientBalances } from "./patient/balances";

// Shared
export { default as Dosages } from "./shared/dosages";
export { default as Drugs } from "./shared/drugs";
export { default as Scans } from "./shared/scans";
export { default as Analysis } from "./shared/analysis";

// Errors & NotFound
export { default as Error } from "./Error";
export { default as NotFound } from "./NotFound";
