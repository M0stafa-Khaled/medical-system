import BookingStatus from "@/features/dashboard/bookings/components/BookingStatus";
import { IBooking } from "@/features/dashboard/bookings/types";
import { ColumnDef } from "@/shared/components/data-table";
import { Button } from "@/shared/components/ui/button";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import convertDay from "@/shared/utils/convertDayLang";
import formatDateTime from "@/shared/utils/formatDate";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import { Link } from "react-router";

export const useDoctorBookingsColumns = (): ColumnDef<IBooking>[] => {
  return [
    {
      key: "code",
      header: "رقم الحجز",
    },
    {
      key: "patient.name" as keyof IBooking,
      header: "المريض",
    },
    {
      key: "patient.first_phone" as keyof IBooking,
      header: "رقم الهاتف",
    },
    {
      key: "action.name" as keyof IBooking,
      header: "الخدمة",
    },
    {
      key: "doctor.name" as keyof IBooking,
      header: "الطبيب",
    },
    {
      key: "status" as keyof IBooking,
      header: "الحالة",
      cell: (row) => <BookingStatus status={row.status} />,
    },
    {
      key: "day",
      header: "اليوم",
      cell: (row) => convertDay(row?.day, "en"),
    },
    {
      key: "booking_date",
      header: "تاريخ الحجز",
      cell: (row) => formatDateTime(row.booking_date),
    },
    {
      key: "actions",
      header: "الاجراءات",
      cell: (row) => (
        <TooltipButton title="إصدار روشتة">
          <Button className="btn-primary rounded-full" size={"icon"} asChild>
            <Link to={`/doctor/bookings/${row?.id}/prescriptions/create`}>
              <LiaNotesMedicalSolid size={20} />
            </Link>
          </Button>
        </TooltipButton>
      ),
    },
  ];
};
