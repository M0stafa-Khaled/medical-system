import { lazy, Suspense } from "react";

import PageLoader from "@/shared/components/PageLoader";
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const VerifyAccount = lazy(() => import("./pages/VerifyAccount"));
const AuthLayout = lazy(() => import("./layout"));

export const authRoutes = [
  {
    path: "/verify-account",
    element: (
      <Suspense fallback={<PageLoader />}>
        <VerifyAccount />
      </Suspense>
    ),
  },
  {
    element: (
      <Suspense fallback={<PageLoader />}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/sign-in",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: "/sign-up",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SignUp />
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
