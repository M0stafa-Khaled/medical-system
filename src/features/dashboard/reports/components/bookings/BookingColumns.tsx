import BookingStatus from "@/features/dashboard/bookings/components/BookingStatus";
import { IBooking } from "@/features/dashboard/bookings/types";
import { ColumnDef } from "@/shared/components/data-table";
import convertDay from "@/shared/utils/convertDayLang";
import formatDateTime from "@/shared/utils/formatDate";
import truncateText from "@/shared/utils/truncateText";

export const useBookingsReportsColumns = (): ColumnDef<IBooking>[] => {
  return [
    {
      key: "code",
      header: "رقم الحجز",
    },
    {
      key: "patient.name" as keyof IBooking,
      header: "المريض",
      cell: (row) => truncateText(row.patient.name || "", 20),
    },
    {
      key: "patient.first_phone" as keyof IBooking,
      header: "رقم الهاتف",
    },
    {
      key: "patient.file_code" as keyof IBooking,
      header: "رقم الملف",
    },
    {
      key: "clinic.name" as keyof IBooking,
      header: "العيادة",
    },
    {
      key: "doctor.name" as keyof IBooking,
      header: "الطبيب",
      cell: (row) => truncateText(row.doctor.name, 20),
    },
    {
      key: "status",
      header: "الحالة",
      cell: (row) => <BookingStatus status={row.status} />,
    },
    {
      key: "day",
      header: "اليوم",
      cell: (row) => convertDay(row.day, "en"),
    },
    {
      key: "start_at",
      header: "موعج الدخول",
    },
    {
      key: "booking_date",
      header: "تاريخ الحجز",
      cell: (row) => formatDateTime(row.booking_date),
    },
  ];
};
