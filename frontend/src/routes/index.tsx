import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { AppLayout, AuthLayout, DashboardLayout, RootLayout } from "@/layout";
import { Login, Register, VerifyEmail } from "@/pages/auth";
import NotFound from "@/pages/NotFound";
import UnAuthorized from "@/pages/UnAuthorized";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import {
  AddDoctor,
  Clinics,
  DoctorDetails,
  Doctors,
  Employees,
  UpdateDoctor,
  AddEmployee,
  UpdateEmployee,
  Patients,
  AddPatient,
  UpdatePatient,
  EmployeeDetails,
  PatientDetails,
  Drugs,
  Treasuries,
  Expenses,
  ExpensesCategories,
  ExpenseDetails,
  CreateWorkingDay,
  UpdateWorkingDay,
  Bookings,
  BookingDetails,
} from "@/pages/dashboard";
import { Profile } from "@/pages/profile";
import { PERMISSIONS } from "@/enums/permissions";

const routes = createRoutesFromElements(
  <>
    {/* Auth */}
    <Route path="/verify-email" element={<VerifyEmail />} />
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>

    {/* Root */}
    <Route path="/" element={<RootLayout />}>
      {/* Home */}
      <Route element={<AppLayout />}>
        <Route index element={<>الصفحة الرئيسية</>} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              requiredRole={["admin", "doctor", "employee", "patient"]}
            >
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole={["admin", "employee"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
        // errorElement={<Error />}
      >
        {/* Home */}
        <Route
          index
          element={<h1 className="text-primary">الصفحة الرئيسية</h1>}
        />

        {/* Bookings */}
        <Route
          path="bookings"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.BOOKINGS}>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="bookings/:bookingId"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_BOOKING}>
              <BookingDetails />
            </ProtectedRoute>
          }
        />

        {/* Clinics */}
        <Route
          path="clinics"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.CLINICS}>
              <Clinics />
            </ProtectedRoute>
          }
        />

        {/* Doctors */}
        <Route
          path="doctors"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.DOCTORS}>
              <Doctors />
            </ProtectedRoute>
          }
        />
        <Route
          path="doctors/:doctorId"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_DOCTOR}>
              <DoctorDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="doctors/add"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.ADD_DOCTOR}>
              <AddDoctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="doctors/:doctorId/update"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.EDIT_DOCTOR}>
              <UpdateDoctor />
            </ProtectedRoute>
          }
        />

        {/* Doctor Working Days */}
        <Route
          path="doctors/:doctorId/working-days/create"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.ADD_WORKING_DAY}>
              <CreateWorkingDay />
            </ProtectedRoute>
          }
        />
        <Route
          path="doctors/:doctorId/working-days/:workingDayId/update"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.EDIT_WORKING_DAY}>
              <UpdateWorkingDay />
            </ProtectedRoute>
          }
        />

        {/* Employees */}
        <Route
          path="employees"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.EMPLOYEES}>
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
          path="employees/:employeeId"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_EMPLOYEE}>
              <EmployeeDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="employees/add"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.ADD_EMPLOYEE}>
              <AddEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="employees/:employeeId/update"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.EDIT_EMPLOYEE}>
              <UpdateEmployee />
            </ProtectedRoute>
          }
        />

        {/* Patients */}
        <Route
          path="patients"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.PATIENTS}>
              <Patients />
            </ProtectedRoute>
          }
        />
        <Route
          path="patients/:patientId"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_PATIENT}>
              <PatientDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="patients/add"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.ADD_PATIENT}>
              <AddPatient />
            </ProtectedRoute>
          }
        />
        <Route
          path="patients/:patientId/update"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.EDIT_PATIENT}>
              <UpdatePatient />
            </ProtectedRoute>
          }
        />

        {/* Drugs */}
        <Route path="drugs" element={<Drugs />} />

        {/* Expenses */}
        <Route
          path="expenses"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.EXPENSES}>
              <Expenses />
            </ProtectedRoute>
          }
        />
        <Route
          path="expenses/:expenseId"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_EXPENSE}>
              <ExpenseDetails />
            </ProtectedRoute>
          }
        />

        {/* Expenses Categories */}
        <Route
          path="expenses-categories"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.EXPENSE_CATEGORIES}>
              <ExpensesCategories />
            </ProtectedRoute>
          }
        />

        {/* Treasuries */}
        <Route
          path="treasuries"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.TREASURIES}>
              <Treasuries />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Errors */}
      <Route path="*" element={<NotFound />} />
      <Route path="/unauthorized" element={<UnAuthorized />} />
    </Route>
  </>
);

const router = createBrowserRouter(routes, {
  basename: "/",
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
});

export default router;
