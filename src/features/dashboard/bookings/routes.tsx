import { ProtectedRoute } from "@/features/auth";
import PageLoader from "@/shared/components/PageLoader";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { lazy, Suspense } from "react";

const Bookings = lazy(() => import("./pages/Bookings"));
const BookingDetails = lazy(() => import("./pages/BookingDetails"));
const CreateBooking = lazy(() => import("./pages/CreateBooking"));
const UpdateBooking = lazy(() => import("./pages/UpdateBooking"));

export const bookingRoutes = [
  {
    path: "bookings",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.BOOKINGS}>
          <Bookings />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "bookings/:bookingId",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_BOOKING}>
          <BookingDetails />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "bookings/create",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.BOOKINGS}>
          <CreateBooking />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "bookings/:bookingId/update",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.BOOKINGS}>
          <UpdateBooking />
        </ProtectedRoute>
      </Suspense>
    ),
  },
];
