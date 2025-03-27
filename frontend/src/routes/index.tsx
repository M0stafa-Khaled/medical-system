import ProtectedRoute from "@/components/auth/ProtectedRoute";
import NotFound from "@/pages/NotFound";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import authRoutes from "./auth";
import { lazy } from "react";
import dashboardRoutes from "./dashboard";
import { AppLayout, RootLayout } from "@/layout";

const Profile = lazy(() => import("@/pages/profile/Profile"));
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
      </Route>
    </Route>

    {/* Errors */}
    <Route path="*" element={<NotFound />} id="not-found" />
    <Route
      path="/not-found"
      element={<NotFound />}
      id="not-round-unauthorized"
    />
  </>
);

const router = createBrowserRouter(
  [...routes, ...authRoutes, ...dashboardRoutes],
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
