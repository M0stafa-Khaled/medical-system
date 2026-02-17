import { ProtectedRoute } from "@/features/auth";
import Bookings from "./pages/Bookings";
import { PERMISSIONS } from "@/enums/permissions";
import BookingDetails from "./pages/BookingDetails";
import CreateBooking from "./pages/CreateBooking";
import UpdateBooking from "./pages/UpdateBooking";

export const bookingRoutes = [
  {
    path: "bookings",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.BOOKINGS}>
        <Bookings />
      </ProtectedRoute>
    ),
  },
  {
    path: "bookings/:bookingId",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_BOOKING}>
        <BookingDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "bookings/create",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.BOOKINGS}>
        <CreateBooking />
      </ProtectedRoute>
    ),
  },
  {
    path: "bookings/:bookingId/update",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.BOOKINGS}>
        <UpdateBooking />
      </ProtectedRoute>
    ),
  },
];
