import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { RootLayout } from "@/layout";
import { createRoutesFromElements, Route } from "react-router-dom";
import { PERMISSIONS } from "@/enums/permissions";
import { lazy } from "react";

const DashboardLayout = lazy(() => import("@/layout/DashboardLayout"));

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
const Drugs = lazy(() => import("@/pages/dashboard/drugs"));
const Analytics = lazy(() => import("@/pages/dashboard/analytics"));
const Scans = lazy(() => import("@/pages/dashboard/scans"));

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

const dashboardRoutes = createRoutesFromElements(
  <Route element={<RootLayout />} id="dashboard-root">
    {/* Dashboard */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute requiredRole={["admin", "employee"]}>
          <DashboardLayout />
        </ProtectedRoute>
      }
      id="dashboard-layout"
      // errorElement={<Error />}
    >
      {/* Home */}
      <Route
        index
        element={
          <h1 className="text-primary font-alexandria">الصفحة الرئيسية</h1>
        }
        id="dashboard-home"
      />

      {/* Bookings */}
      <Route
        path="bookings"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.BOOKINGS}>
            <DashboardBookings />
          </ProtectedRoute>
        }
        id="dashboard-bookings"
      />
      <Route
        path="bookings/:bookingId"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_BOOKING}>
            <DashboardBookingDetails />
          </ProtectedRoute>
        }
        id="dashboard-booking-details"
      />
      <Route
        path="bookings/create"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.BOOKINGS}>
            <DashboardCreateBooking />
          </ProtectedRoute>
        }
        id="dashboard-create-booking"
      />
      <Route
        path="bookings/:bookingId/update"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.BOOKINGS}>
            <DashboardUpdateBooking />
          </ProtectedRoute>
        }
        id="dashboard-update-booking"
      />

      {/* Clinics */}
      <Route
        path="clinics"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.CLINICS}>
            <Clinics />
          </ProtectedRoute>
        }
        id="dashboard-clinics"
      />

      {/* Doctors */}
      <Route
        path="doctors"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.DOCTORS}>
            <Doctors />
          </ProtectedRoute>
        }
        id="dashboard-doctors"
      />
      <Route
        path="doctors/:doctorId"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_DOCTOR}>
            <DoctorDetails />
          </ProtectedRoute>
        }
        id="dashboard-doctor-details"
      />
      <Route
        path="doctors/create"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.ADD_DOCTOR}>
            <CreateDoctor />
          </ProtectedRoute>
        }
        id="dashboard-create-doctor"
      />
      <Route
        path="doctors/:doctorId/update"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_DOCTOR}>
            <UpdateDoctor />
          </ProtectedRoute>
        }
        id="dashboard-update-doctor"
      />

      {/* Doctor Working Days */}
      <Route
        path="doctors/:doctorId/working-days/create"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.ADD_WORKING_DAY}>
            <CreateWorkingDay />
          </ProtectedRoute>
        }
        id="dashboard-create-working-day"
      />
      <Route
        path="doctors/:doctorId/working-days/:workingDayId/update"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_WORKING_DAY}>
            <UpdateWorkingDay />
          </ProtectedRoute>
        }
        id="dashboard-update-working-day"
      />

      {/* Employees */}
      <Route
        path="employees"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.EMPLOYEES}>
            <Employees />
          </ProtectedRoute>
        }
        id="dashboard-employees"
      />
      <Route
        path="employees/:employeeId"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_EMPLOYEE}>
            <EmployeeDetails />
          </ProtectedRoute>
        }
        id="dashboard-employee-details"
      />

      <Route
        path="employees/create"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.ADD_EMPLOYEE}>
            <CreateEmployee />
          </ProtectedRoute>
        }
        id="dashboard-create-employee"
      />

      <Route
        path="employees/:employeeId/update"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_EMPLOYEE}>
            <UpdateEmployee />
          </ProtectedRoute>
        }
        id="dashboard-update-employee"
      />

      {/* Patients */}
      <Route
        path="patients"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.PATIENTS}>
            <Patients />
          </ProtectedRoute>
        }
        id="dashboard-patients"
      />
      <Route
        path="patients/:patientId"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_PATIENT}>
            <PatientDetails />
          </ProtectedRoute>
        }
        id="dashboard-patient-details"
      />
      <Route
        path="patients/create"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.ADD_PATIENT}>
            <CreatePatient />
          </ProtectedRoute>
        }
        id="dashboard-create-patient"
      />
      <Route
        path="patients/:patientId/update"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_PATIENT}>
            <UpdatePatient />
          </ProtectedRoute>
        }
        id="dashboard-update-patient"
      />

      {/* Drugs */}
      <Route path="drugs" element={<Drugs />} id="dashboard-drugs" />
      <Route
        path="analytics"
        element={<Analytics />}
        id="dashboard-analytics"
      />
      <Route path="scans" element={<Scans />} id="dashboard-scans" />

      {/* Expenses */}
      <Route
        path="expenses"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.EXPENSES}>
            <Expenses />
          </ProtectedRoute>
        }
        id="dashboard-expenses"
      />
      <Route
        path="expenses/:expenseId"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_EXPENSE}>
            <ExpenseDetails />
          </ProtectedRoute>
        }
        id="dashboard-expense-details"
      />

      {/* Expenses Categories */}
      <Route
        path="expenses-categories"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.EXPENSE_CATEGORIES}>
            <ExpensesCategories />
          </ProtectedRoute>
        }
        id="dashboard-expenses-categories"
      />

      {/* Transactions */}
      <Route
        path="transactions"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.TRANSACTIONS}>
            <Transactions />
          </ProtectedRoute>
        }
        id="dashboard-transactions"
      />
      <Route
        path="transactions/:transactionId"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_TRANSACTION}>
            <TransactionDetails />
          </ProtectedRoute>
        }
        id="dashboard-transaction-details"
      />
      <Route
        path="last-visits/:patientId/transactions/:doctorId"
        element={
          <ProtectedRoute
            requiredPermission={PERMISSIONS.LAST_PATIENT_TRANSACTIONS}
          >
            <LastVisits />
          </ProtectedRoute>
        }
        id="dashboard-last-visits"
      />

      {/* Treasuries */}
      <Route
        path="treasuries"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.TREASURIES}>
            <Treasuries />
          </ProtectedRoute>
        }
        id="dashboard-treasuries"
      />
    </Route>
  </Route>
);

export default dashboardRoutes;
