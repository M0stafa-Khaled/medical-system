import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { DashboardLayout, RootLayout } from "@/layout";
import { createRoutesFromElements, Route } from "react-router-dom";

import {
  Clinics,
  // Doctors
  Doctors,
  DoctorDetails,
  CreateDoctor,
  CreateWorkingDay,
  UpdateWorkingDay,
  // Employees
  Employees,
  EmployeeDetails,
  UpdateDoctor,
  CreateEmployee,
  UpdateEmployee,
  // Patients
  Patients,
  CreatePatient,
  UpdatePatient,
  PatientDetails,
  // Drugs
  Drugs,
  // Treasuries
  Treasuries,
  Expenses,
  // Expenses
  ExpensesCategories,
  ExpenseDetails,
  // Bookings
  DashboardBookings,
  DashboardBookingDetails,
  DashboardCreateBooking,
  DashboardUpdateBooking,
  // Transactions
  Transactions,
  TransactionDetails,
  LastVisits,
} from "@/pages/dashboard";

import { PERMISSIONS } from "@/enums/permissions";

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
          <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_TRANSACTION}>
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
