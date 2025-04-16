import BookingStatus from "@/components/dashboard/bookings/BookingStatus";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TooltipButton from "@/components/ui/TooltipButton";
import { IPatientBooking } from "@/interfaces/patient/patientBookings";
import convertDay from "@/utils/convertDayLang";
import formatDateTime from "@/utils/formatDate";
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
import { Link } from "react-router-dom";
import DeletePatientBooking from "./DeletePatientBooking";

interface IProps {
  booking: IPatientBooking;
}

const PatientBookingCard = ({ booking }: IProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-md cursor-pointer border-primary/10  hover:border-primary/40 dark:bg-black/60">
      <CardContent className="flex flex-col gap-4">
        <CardHeader className="px-0 pb-0 flex-row items-center justify-between">
          <CardTitle>
            <Bookmark size={24} />
          </CardTitle>
        </CardHeader>
        <CardContent className="py-0 space-y-3 px-2 sm:px-3 lg:px-4 xl:px-2">
          <div className="flex items-center gap-2 text-black dark:text-white md:text-lg">
            <Hash className="h-5 w-5" />
            <h2>رقم الحجز:</h2>
            <p className="bg-foreground p-2 w-10 border border-primary/20 h-10 flex justify-center items-center rounded-full text-lg">
              {booking.code}
            </p>
          </div>
          <div className="flex items-center gap-2 text-black dark:text-white md:text-lg">
            <CheckCheck className="h-5 w-5" />
            <h2>حالة الكشف:</h2>
            <BookingStatus status={booking.status} />
          </div>
          <div className="flex items-center gap-2 text-black dark:text-white md:text-lg">
            <Building2 className="h-5 w-5" />
            <h2>العيادة:</h2>
            <p>{booking.clinic.name}</p>
          </div>
          <div className="flex items-center gap-2 text-black dark:text-white md:text-lg">
            <Clock className="h-5 w-5" />
            <h2>موعد الدخول:</h2>
            <p dir="ltr">{booking.start_at}</p>
          </div>
          <div className="flex items-center gap-2 text-black dark:text-white md:text-lg">
            <ClipboardPlus className="h-5 w-5" />
            <h2>الخدمة:</h2>
            <p>{booking.action?.name}</p>
          </div>
          <div className="flex items-center gap-2 text-black dark:text-white md:text-lg">
            <Calendar className="h-5 w-5" />
            <h2>اليوم:</h2>
            <p>{convertDay(booking.working_day.day, "en")}</p>
          </div>
          <div className="flex items-center gap-2 text-black dark:text-white md:text-lg">
            <FaUserDoctor className="h-5 w-5" />
            <h2>الطبيب:</h2>
            <p>{booking?.doctor?.name}</p>
          </div>
        </CardContent>
        <Separator className="dark:bg-gray-700" />
        <CardFooter className="pb-1 px-0 flex-col items-start gap-4">
          <div className="flex flex-col gap-3 items-start">
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
              <div className="w-full flex items-center justify-between gap-4">
                <DeletePatientBooking id={booking.id.toString()} />
                <TooltipButton title="حذف">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 w-1/2 h-auto py-0 px-0">
                    <Link
                      to={`/bookings/${booking?.id}/update`}
                      className="flex justify-center items-center gap-2 py-3 px-3 w-full text-white"
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
