import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { lazy } from "react";
import { AppLayout, RootLayout } from "@/layout";
import authRoutes from "./auth";
import dashboardRoutes from "./dashboard";
import patientRoutes from "./patient";

import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const Profile = lazy(() => import("@/pages/profile/Profile"));
const Settings = lazy(() => import("@/pages/settings"));

const routes = createRoutesFromElements(
  <>
    <Route
      path="/"
      element={<RootLayout />}
      id="main-root" // errorElement={<Error />}
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
        {/* Settings */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute requiredRole={["admin", "employee"]}>
              <Settings />
            </ProtectedRoute>
          }
          id="settings"
        />
      </Route>
    </Route>

    {/* Not Found */}
    <Route path="*" element={<NotFound />} id="not-found" />
  </>
);

const router = createBrowserRouter(
  [...routes, ...authRoutes, ...dashboardRoutes, ...patientRoutes],
  {
    basename: "/",
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
