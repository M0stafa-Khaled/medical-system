import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import { lazy } from "react";

import authRoutes from "./auth";
import dashboardRoutes from "./dashboard";
import patientRoutes from "./patient";
import doctorRoutes from "./doctor";

import NotFound from "@/pages/NotFound";
// import Error from "@/pages/Error";

const Landing = lazy(() => import("@/pages/landing"));

const RootLayout = lazy(() => import("@/layout/RootLayout"));
const ProtectedRoute = lazy(() => import("@/components/auth/ProtectedRoute"));
const Profile = lazy(() => import("@/pages/profile"));

const rootRoutes = createRoutesFromElements(
  <>
    <Route
      path="/"
      element={<RootLayout />}
      id="main-root"
      // errorElement={<Error />}
    >
      {/* Home + Protected pages wrapped in AppLayout */}
      <Route index element={<Landing />} id="landing" />

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
