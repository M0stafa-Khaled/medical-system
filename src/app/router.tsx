import { createBrowserRouter } from "react-router";
import NotFound from "@/pages/NotFound";
import { authRoutes } from "@/features/auth";
import { dashboardRoutes } from "@/features/dashboard";
import RootLayout from "@/shared/components/layouts/RootLayout";
import { ProtectedRoute } from "@/app/ProtectedRoute";
import { Landing } from "@/features/landing";
import { Profile } from "@/features/profile";
import { doctorRoutes } from "@/features/doctor";
import { patientRoutes } from "@/features/patient";
import Error from "@/pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Landing />,
        errorElement: <Error />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute
            requiredRole={["admin", "doctor", "employee", "patient"]}
          >
            <Profile />
          </ProtectedRoute>
        ),
      },
      ...dashboardRoutes,
      ...doctorRoutes,
      ...patientRoutes,
    ],
  },
  ...authRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
]);
