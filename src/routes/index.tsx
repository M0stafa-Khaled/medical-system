// src/router.ts    ← note: .ts, not .tsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom"; // ← make sure you're using react-router-dom
import { lazy } from "react";

import authRoutes from "./auth";
import dashboardRoutes from "./dashboard";
import patientRoutes from "./patient";
import doctorRoutes from "./doctor";

import NotFound from "@/pages/NotFound";
// import Error from "@/pages/Error";   // uncomment if you want to use it later

const AppLayout = lazy(() => import("@/layout/AppLayout"));
const RootLayout = lazy(() => import("@/layout/RootLayout"));
const ProtectedRoute = lazy(() => import("@/components/auth/ProtectedRoute"));
const Profile = lazy(() => import("@/pages/profile"));

const rootRoutes = createRoutesFromElements(
  <>
    <Route
      path="/"
      element={<RootLayout />}
      id="main-root"
      // errorElement={<Error />}     // ← you can enable this later
    >
      {/* Home + Protected pages wrapped in AppLayout */}
      <Route element={<AppLayout />} id="app-layout">
        <Route index element={<Navigate to="/login" replace />} id="home" />

        {/* Profile – accessible to multiple roles */}
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

    {/* 404 – should be last */}
    <Route path="*" element={<NotFound />} id="not-found" />
  </>
);

export const router = createBrowserRouter(
  [
    ...rootRoutes,
    ...authRoutes,
    ...dashboardRoutes,
    ...patientRoutes,
    ...doctorRoutes,
  ],
  {
    basename: "/",
  }
);
