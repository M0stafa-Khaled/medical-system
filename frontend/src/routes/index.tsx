import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { lazy } from "react";
import authRoutes from "./auth";
import dashboardRoutes from "./dashboard";
import patientRoutes from "./patient";

import NotFound from "@/pages/NotFound";
// import Error from "@/pages/Error";

import doctorRoutes from "./doctor";

const AppLayout = lazy(() => import("@/layout/AppLayout"));
const RootLayout = lazy(() => import("@/layout/RootLayout"));
const ProtectedRoute = lazy(() => import("@/components/auth/ProtectedRoute"));
const Profile = lazy(() => import("@/pages/profile/Profile"));

const routes = createRoutesFromElements(
  <>
    <Route
      path="/"
      element={<RootLayout />}
      id="main-root"
      // errorElement={<Error />}
    >
      {/* Home */}
      <Route element={<AppLayout />} id="app-layout">
        <Route index element={<>الصفحة الرئيسية</>} id="home" />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              requiredRole={["admin", "doctor", "employee", "patient"]}
            >
              <Profile />
            </ProtectedRoute>
          }
          id="profile"
        />
      </Route>
    </Route>

    {/* Not Found */}
    <Route path="*" element={<NotFound />} id="not-found" />
  </>
);

const router = createBrowserRouter(
  [
    ...routes,
    ...authRoutes,
    ...dashboardRoutes,
    ...patientRoutes,
    ...doctorRoutes,
  ],
  { basename: "/" }
);

export default router;
