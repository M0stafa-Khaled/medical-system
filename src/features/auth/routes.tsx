import { lazy, Suspense } from "react";

import PageLoader from "@/shared/components/PageLoader";
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const VerifyAccount = lazy(() => import("./pages/VerifyAccount"));
const AuthLayout = lazy(() => import("./layout"));

export const authRoutes = [
  {
    path: "/verify-account",
    element: (
      <Suspense fallback={<PageLoader />}>
        <VerifyAccount />,
      </Suspense>
    ),
  },
  {
    element: (
      <Suspense fallback={<PageLoader />}>
        <AuthLayout />,
      </Suspense>
    ),
    children: [
      {
        path: "/login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: "/reset-password",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ResetPassword />
          </Suspense>
        ),
      },
    ],
  },
];
