import { createRoutesFromElements, Route } from "react-router-dom";
import { PERMISSIONS } from "@/enums/permissions";
import { lazy, Suspense } from "react";
import LoadingSpinnerPage from "@/components/LoadingSpinnerPage";

const RootLayout = lazy(() => import("@/layout/RootLayout"));
const ProtectedRoute = lazy(() => import("@/components/auth/ProtectedRoute"));
const DashboardLayout = lazy(() => import("@/layout/DashboardLayout"));
const Dashboard = lazy(() => import("@/pages/dashboard"));

// Clinics
const Clinics = lazy(() => import("@/pages/dashboard/clinics"));

// Doctors
const Doctors = lazy(() => import("@/pages/dashboard/doctors"));
const DoctorDetails = lazy(
  () => import("@/pages/dashboard/doctors/DoctorDetails")
);
const CreateDoctor = lazy(
  () => import("@/pages/dashboard/doctors/CreateDoctor")
);
const UpdateDoctor = lazy(
  () => import("@/pages/dashboard/doctors/UpdateDoctor")
);

// Working Days
const CreateWorkingDay = lazy(
  () => import("@/pages/dashboard/doctors/workingDays/CreateWorkingDay")
);
const UpdateWorkingDay = lazy(
  () => import("@/pages/dashboard/doctors/workingDays/UpdateWorkingDay")
);

// Employees
const Employees = lazy(() => import("@/pages/dashboard/employees"));
const EmployeeDetails = lazy(
  () => import("@/pages/dashboard/employees/EmployeeDetails")
);
const CreateEmployee = lazy(
  () => import("@/pages/dashboard/employees/CreateEmployee")
);
const UpdateEmployee = lazy(
  () => import("@/pages/dashboard/employees/UpdateEmployee")
);

// Patients
const Patients = lazy(() => import("@/pages/dashboard/patients"));
const PatientDetails = lazy(
  () => import("@/pages/dashboard/patients/PatientDetails")
);
const CreatePatient = lazy(
  () => import("@/pages/dashboard/patients/CreatePatient")
);
const UpdatePatient = lazy(
  () => import("@/pages/dashboard/patients/UpdatePatient")
);

// Drugs
const Drugs = lazy(() => import("@/pages/main/drugs"));
const Analysis = lazy(() => import("@/pages/main/analysis"));
const Scans = lazy(() => import("@/pages/main/scans"));

// Treasuries
const Treasuries = lazy(() => import("@/pages/dashboard/treasuries"));
const Expenses = lazy(() => import("@/pages/dashboard/expenses"));

// Expenses
const ExpensesCategories = lazy(
  () => import("@/pages/dashboard/expensesCategories")
);
const ExpenseDetails = lazy(
  () => import("@/pages/dashboard/expenses/ExpenseDetails")
);

// Bookings
const DashboardBookings = lazy(() => import("@/pages/dashboard/bookings"));
const DashboardBookingDetails = lazy(
  () => import("@/pages/dashboard/bookings/BookingDetails")
);
const DashboardCreateBooking = lazy(
  () => import("@/pages/dashboard/bookings/CreateBooking")
);
const DashboardUpdateBooking = lazy(
  () => import("@/pages/dashboard/bookings/UpdateBooking")
);

// Transactions
const Transactions = lazy(() => import("@/pages/dashboard/transactions"));
const TransactionDetails = lazy(
  () => import("@/pages/dashboard/transactions/TransactionDetails")
);
const LastVisits = lazy(
  () => import("@/pages/dashboard/transactions/LastVisits")
);

// Dosages
const Dosages = lazy(() => import("@/pages/main/dosages"));

// Prescriptions
const Prescriptions = lazy(() => import("@/pages/dashboard/prescription"));
const CreatePrescription = lazy(
  () => import("@/pages/dashboard/prescription/CreatePrescription")
);
const UpdatePrescription = lazy(
  () => import("@/pages/dashboard/prescription/UpdatePrescription")
);
const PrescriptionDetails = lazy(
  () => import("@/pages/dashboard/prescription/PrescriptionDetails")
);

// Company
const Settings = lazy(() => import("@/pages/dashboard/settings"));

// Reports
const BookingsReports = lazy(
  () => import("@/pages/dashboard/reports/bookingsReports")
);
const ExpensesReports = lazy(
  () => import("@/pages/dashboard/reports/expensesReports")
);
const TransactionsReports = lazy(
  () => import("@/pages/dashboard/reports/transactionsReports")
);
const PrescriptionsReports = lazy(
  () => import("@/pages/dashboard/reports/prescriptionsReports")
);
const PatientsReports = lazy(
  () => import("@/pages/dashboard/reports/patientsReports")
);
const PatientBalancesReports = lazy(
  () => import("@/pages/dashboard/reports/patientBalancesReports")
);
const TransfersReports = lazy(
  () => import("@/pages/dashboard/reports/transfersReports")
);
const TreasuriesReports = lazy(
  () => import("@/pages/dashboard/reports/treasuriesReports")
);

const dashboardRoutes = createRoutesFromElements(
  <Route element={<RootLayout />} id="dashboard-root">
    {/* Dashboard */}
    <Route
      path="/dashboard"
      element={
        <Suspense fallback={<LoadingSpinnerPage />}>
          <ProtectedRoute requiredRole={["admin", "employee"]}>
            <DashboardLayout />
          </ProtectedRoute>
        </Suspense>
      }
      id="dashboard-layout"
    >
      {/* Home */}
      <Route
        index
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <Dashboard />
          </Suspense>
        }
        id="dashboard-home"
      />

      {/* Company */}
      <Route
        path="settings"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <Settings />
          </Suspense>
        }
        id="settings"
      />

      {/* Bookings */}
      <Route
        path="bookings"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.BOOKINGS}>
              <DashboardBookings />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-bookings"
      />
      <Route
        path="bookings/:bookingId"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_BOOKING}>
              <DashboardBookingDetails />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-booking-details"
      />
      <Route
        path="bookings/create"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.BOOKINGS}>
              <DashboardCreateBooking />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-create-booking"
      />
      <Route
        path="bookings/:bookingId/update"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.BOOKINGS}>
              <DashboardUpdateBooking />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-update-booking"
      />

      {/* Clinics */}
      <Route
        path="clinics"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.CLINICS}>
              <Clinics />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-clinics"
      />

      {/* Doctors */}
      <Route
        path="doctors"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.DOCTORS}>
              <Doctors />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-doctors"
      />
      <Route
        path="doctors/:doctorId"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_DOCTOR}>
              <DoctorDetails />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-doctor-details"
      />
      <Route
        path="doctors/create"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.ADD_DOCTOR}>
              <CreateDoctor />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-create-doctor"
      />
      <Route
        path="doctors/:doctorId/update"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_DOCTOR}>
              <UpdateDoctor />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-update-doctor"
      />

      {/* Doctor Working Days */}
      <Route
        path="doctors/:doctorId/working-days/create"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.ADD_WORKING_DAY}>
              <CreateWorkingDay />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-create-working-day"
      />
      <Route
        path="doctors/:doctorId/working-days/:workingDayId/update"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_WORKING_DAY}>
              <UpdateWorkingDay />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-update-working-day"
      />

      {/* Employees */}
      <Route
        path="employees"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.EMPLOYEES}>
              <Employees />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-employees"
      />
      <Route
        path="employees/:employeeId"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_EMPLOYEE}>
              <EmployeeDetails />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-employee-details"
      />
      <Route
        path="employees/create"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.ADD_EMPLOYEE}>
              <CreateEmployee />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-create-employee"
      />
      <Route
        path="employees/:employeeId/update"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_EMPLOYEE}>
              <UpdateEmployee />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-update-employee"
      />

      {/* Patients */}
      <Route
        path="patients"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.PATIENTS}>
              <Patients />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-patients"
      />
      <Route
        path="patients/:patientId"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_PATIENT}>
              <PatientDetails />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-patient-details"
      />
      <Route
        path="patients/create"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.ADD_PATIENT}>
              <CreatePatient />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-create-patient"
      />
      <Route
        path="patients/:patientId/update"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_PATIENT}>
              <UpdatePatient />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-update-patient"
      />

      {/* Drugs */}
      <Route
        path="drugs"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <Drugs />
          </Suspense>
        }
        id="dashboard-drugs"
      />
      <Route
        path="analytics"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <Analysis />
          </Suspense>
        }
        id="dashboard-analytics"
      />
      <Route
        path="scans"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <Scans />
          </Suspense>
        }
        id="dashboard-scans"
      />

      {/* Expenses */}
      <Route
        path="expenses"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.EXPENSES}>
              <Expenses />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-expenses"
      />
      <Route
        path="expenses/:expenseId"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_EXPENSE}>
              <ExpenseDetails />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-expense-details"
      />

      {/* Expenses Categories */}
      <Route
        path="expenses-categories"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.EXPENSE_CATEGORIES}>
              <ExpensesCategories />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-expenses-categories"
      />

      {/* Transactions */}
      <Route
        path="transactions"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.TRANSACTIONS}>
              <Transactions />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-transactions"
      />
      <Route
        path="transactions/:transactionId"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_TRANSACTION}>
              <TransactionDetails />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-transaction-details"
      />
      <Route
        path="last-visits/:patientId/transactions/:doctorId"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute
              requiredPermission={PERMISSIONS.LAST_PATIENT_TRANSACTIONS}
            >
              <LastVisits />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-last-visits"
      />

      {/* Treasuries */}
      <Route
        path="treasuries"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.TREASURIES}>
              <Treasuries />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-treasuries"
      />

      {/* Dosages */}
      <Route
        path="dosages"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.DOSAGES}>
              <Dosages />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-dosages"
      />

      {/* Prescriptions */}

      <Route
        path="prescriptions"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.PRESCRIPTIONS}>
              <Prescriptions />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-prescriptions"
      />
      <Route
        path="prescriptions/:prescriptionId"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_PRESCRIPTION}>
              <PrescriptionDetails />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-prescription-details"
      />
      <Route
        path="prescriptions/create"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.ADD_PRESCRIPTION}>
              <CreatePrescription />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-prescriptions-create"
      />
      <Route
        path="bookings/:bookingId/prescriptions/create"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.ADD_PRESCRIPTION}>
              <CreatePrescription />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-bookings-prescriptions-create"
      />
      <Route
        path="prescriptions/:prescriptionId/update"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute
              requiredPermission={PERMISSIONS.UPDATE_PRESCRIPTION}
            >
              <UpdatePrescription />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-prescriptions-update"
      />

      {/* Reports */}
      <Route
        path="reports/bookings"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.BOOKINGS_REPORTS}>
              <BookingsReports />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-bookings-reports"
      />
      <Route
        path="reports/expenses"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.EXPENSES_REPORTS}>
              <ExpensesReports />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-expenses-reports"
      />
      <Route
        path="reports/patients"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.PATIENTS_REPORTS}>
              <PatientsReports />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-patients-reports"
      />
      <Route
        path="reports/patient-balances"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute
              requiredPermission={PERMISSIONS.PATIENT_BALANCES_REPORTS}
            >
              <PatientBalancesReports />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-patient-balances-reports"
      />
      <Route
        path="reports/prescriptions"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute
              requiredPermission={PERMISSIONS.PRESCRIPTIONS_REPORTS}
            >
              <PrescriptionsReports />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-prescriptions-reports"
      />
      <Route
        path="reports/transactions"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute
              requiredPermission={PERMISSIONS.TRANSACTIONS_REPORTS}
            >
              <TransactionsReports />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-transactions-reports"
      />
      <Route
        path="reports/transfers"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.TRANSFERS_REPORTS}>
              <TransfersReports />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-transfers-reports"
      />
      <Route
        path="reports/treasuries"
        element={
          <Suspense fallback={<LoadingSpinnerPage />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.TREASURIES_REPORTS}>
              <TreasuriesReports />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-treasuries-reports"
      />
    </Route>
  </Route>
);

export default dashboardRoutes;
