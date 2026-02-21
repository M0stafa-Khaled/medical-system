import { createBrowserRouter } from "react-router";
import NotFound from "@/pages/NotFound";
import { authRoutes } from "@/features/auth";
import { dashboardRoutes } from "@/features/dashboard";
import RootLayout from "@/shared/components/layouts/RootLayout";
import { ProtectedRoute } from "@/features/auth";
import { Landing } from "@/features/landing";
import { Profile } from "@/features/profile";

// import Error from "@/pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
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
    ],
  },
  ...authRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
]);
