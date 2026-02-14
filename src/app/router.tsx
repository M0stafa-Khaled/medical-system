import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import NotFound from "@/pages/NotFound";
import { authRoutes } from "@/features/auth";
import { dashboardRoutes } from "@/features/dashboard";
import patientRoutes from "@/routes/patient";
import doctorRoutes from "@/routes/doctor";
import RootLayout from "@/shared/components/layouts/RootLayout";
import { ProtectedRoute } from "@/features/auth";
import { Landing } from "@/features/landing";
import { Profile } from "@/features/profile";

// import Error from "@/pages/Error";

const rootRoutes = createRoutesFromElements(
  <>
    <Route index element={<Landing />} id="landing" />

    <Route
      path="/"
      element={<RootLayout />}
      id="main-root"
      // errorElement={<Error />}
    >
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

    {/* Not found */}
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
