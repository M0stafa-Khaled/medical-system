import { createRoutesFromElements, Route } from "react-router";
import { PERMISSIONS } from "@/enums/permissions";
import { lazy, Suspense } from "react";
import PageLoader from "@/components/shared/PageLoader";
import { ProtectedRoute } from "@/features/auth";
import DashboardLayout from "@/features/dashboard/layout";
// import Error from "@/pages/Error";

const RootLayout = lazy(() => import("@/shared/components/layouts/RootLayout"));

// Clinics

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
const Drugs = lazy(() => import("@/pages/shared/drugs"));
const Analysis = lazy(() => import("@/pages/shared/analysis"));
const Scans = lazy(() => import("@/pages/shared/scans"));

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
const Dosages = lazy(() => import("@/pages/shared/dosages"));

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
  <Route
    element={<RootLayout />}
    id="dashboard-root"
    // errorElement={<Error />}
  >
    {/* Dashboard */}
    <Route
      path="/dashboard"
      element={
        <Suspense fallback={<PageLoader />}>
          <ProtectedRoute requiredRole={["admin", "employee"]}>
            <DashboardLayout />
          </ProtectedRoute>
        </Suspense>
      }
      id="dashboard-layout"
    >
      {/* Company */}
      <Route
        path="settings"
        element={
          <Suspense fallback={<PageLoader />}>
            <Settings />
          </Suspense>
        }
        id="settings"
      />

      {/* Bookings */}
      <Route
        path="bookings"
        element={
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.BOOKINGS}>
              <DashboardUpdateBooking />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-update-booking"
      />

      {/* Doctors */}
      <Route
        path="doctors"
        element={
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_WORKING_DAY}>
              <UpdateWorkingDay />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-update-working-day"
      />

      {/* Patients */}
      <Route
        path="patients"
        element={
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
            <Drugs />
          </Suspense>
        }
        id="dashboard-drugs"
      />
      <Route
        path="analytics"
        element={
          <Suspense fallback={<PageLoader />}>
            <Analysis />
          </Suspense>
        }
        id="dashboard-analytics"
      />
      <Route
        path="scans"
        element={
          <Suspense fallback={<PageLoader />}>
            <Scans />
          </Suspense>
        }
        id="dashboard-scans"
      />

      {/* Expenses */}
      <Route
        path="expenses"
        element={
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
          <Suspense fallback={<PageLoader />}>
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
