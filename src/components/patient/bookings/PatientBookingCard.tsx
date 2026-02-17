import BookingStatus from "@/features/dashboard/bookings/components/BookingStatus";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { IPatientBooking } from "@/interfaces/patient/patientBookings";
import convertDay from "@/shared/utils/convertDayLang";
import formatDateTime from "@/shared/utils/formatDate";
import {
  Bookmark,
  Building2,
  Calendar,
  CheckCheck,
  ClipboardPlus,
  Clock,
  Hash,
  Pen,
} from "lucide-react";
import { FaUserDoctor } from "react-icons/fa6";
import { Link } from "react-router";
import DeletePatientBooking from "./DeletePatientBooking";

interface IProps {
  booking: IPatientBooking;
}

const PatientBookingCard = ({ booking }: IProps) => {
  return (
    <Card className="border-primary/10 hover:border-primary/40 h-full cursor-pointer transition-all duration-300 hover:shadow-md dark:bg-black/60">
      <CardContent className="flex flex-col gap-4">
        <CardHeader className="flex-row items-center justify-between px-0 pb-0">
          <CardTitle>
            <Bookmark size={24} />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-2 py-0 sm:px-3 lg:px-4 xl:px-2">
          <div className="flex items-center gap-2 text-black md:text-lg dark:text-white">
            <Hash className="h-5 w-5" />
            <h2>رقم الحجز:</h2>
            <p className="bg-foreground border-primary/20 flex h-10 w-10 items-center justify-center rounded-full border p-2 text-lg">
              {booking.code}
            </p>
          </div>
          <div className="flex items-center gap-2 text-black md:text-lg dark:text-white">
            <CheckCheck className="h-5 w-5" />
            <h2>حالة الكشف:</h2>
            <BookingStatus status={booking.status} />
          </div>
          <div className="flex items-center gap-2 text-black md:text-lg dark:text-white">
            <Building2 className="h-5 w-5" />
            <h2>العيادة:</h2>
            <p>{booking.clinic.name}</p>
          </div>
          <div className="flex items-center gap-2 text-black md:text-lg dark:text-white">
            <Clock className="h-5 w-5" />
            <h2>موعد الدخول:</h2>
            <p dir="ltr">{booking.start_at}</p>
          </div>
          <div className="flex items-center gap-2 text-black md:text-lg dark:text-white">
            <ClipboardPlus className="h-5 w-5" />
            <h2>الخدمة:</h2>
            <p>{booking.action?.name}</p>
          </div>
          <div className="flex items-center gap-2 text-black md:text-lg dark:text-white">
            <Calendar className="h-5 w-5" />
            <h2>اليوم:</h2>
            <p>{convertDay(booking.working_day.day, "en")}</p>
          </div>
          <div className="flex items-center gap-2 text-black md:text-lg dark:text-white">
            <FaUserDoctor className="h-5 w-5" />
            <h2>الطبيب:</h2>
            <p>{booking?.doctor?.name}</p>
          </div>
        </CardContent>
        <Separator className="dark:bg-gray-700" />
        <CardFooter className="flex-col items-start gap-4 px-0 pb-1">
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2 text-black dark:text-white">
              <Calendar className="h-5 w-5" />
              <h2 className="text-sm">تاريخ الحجز:</h2>
              <p className="text-sm">{formatDateTime(booking.booking_date!)}</p>
            </div>
            <div className="flex items-center gap-2 text-black dark:text-white">
              <Calendar className="h-5 w-5" />
              <h2 className="text-sm text-nowrap">تاريخ انشاء الحجز:</h2>
              <p className="text-sm">{formatDateTime(booking.created_at!)}</p>
            </div>
          </div>
          {booking.status !== "cancelled" &&
            booking.status !== "ended" &&
            booking.status !== "collected" && (
              <div className="flex w-full items-center justify-between gap-4">
                <DeletePatientBooking id={booking.id.toString()} />
                <TooltipButton title="حذف">
                  <Button className="h-auto w-1/2 gap-2 bg-blue-600 px-0 py-0 text-white hover:bg-blue-700">
                    <Link
                      to={`/bookings/${booking?.id}/update`}
                      className="flex w-full items-center justify-center gap-2 px-3 py-3 text-white"
                    >
                      <Pen size={20} />
                      تعديل الحجز
                    </Link>
                  </Button>
                </TooltipButton>
              </div>
            )}
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default PatientBookingCard;
