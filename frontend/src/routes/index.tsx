import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { DashboardLayout, RootLayout } from "@/layout";
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
} from "@/pages/dashboard";
import { Profile } from "@/pages/profile";
import { PERMISSIONS } from "@/enums/permissions";

const routes = createRoutesFromElements(
  <>
    {/* Public */}
    <Route element={<RootLayout />}>
      <Route path="/" element={<>الصفحة الرئيسية</>} />
      <Route path="/profile" element={<Profile />} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/verify-email" element={<VerifyEmail />} />

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
      <Route
        index
        element={<h1 className="text-primary">الصفحة الرئيسية</h1>}
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
        path="doctors/update/:doctorId"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.EDIT_DOCTOR}>
            <UpdateDoctor />
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
        path="employees/update/:employeeId"
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
        path="patients/update/:patientId"
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.EDIT_PATIENT}>
            <UpdatePatient />
          </ProtectedRoute>
        }
      />

      {/* pharmaceutical */}
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
