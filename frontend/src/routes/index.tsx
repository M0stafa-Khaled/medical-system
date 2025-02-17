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
} from "@/pages/dashboard";
import { Profile } from "@/pages/profile";

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
        <ProtectedRoute requiredRole={["admin"]}>
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
      <Route path="clinics" element={<Clinics />} />
      {/* Doctors */}
      <Route path="doctors" element={<Doctors />} />
      <Route path="doctors/:doctorId" element={<DoctorDetails />} />
      <Route path="doctors/add" element={<AddDoctor />} />
      <Route path="doctors/update/:doctorId" element={<UpdateDoctor />} />

      {/* Employees */}
      <Route path="employees" element={<Employees />} />
      <Route path="employees/:employeeId" element={<EmployeeDetails />} />
      <Route path="employees/add" element={<AddEmployee />} />
      <Route path="employees/update/:employeeId" element={<UpdateEmployee />} />

      {/* Patients */}
      <Route path="patients" element={<Patients />} />
      <Route path="patients/:patientId" element={<PatientDetails />} />
      <Route path="patients/add" element={<AddPatient />} />
      <Route path="patients/update/:patientId" element={<UpdatePatient />} />
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
