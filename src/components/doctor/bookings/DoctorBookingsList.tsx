import { TableCell } from "@/shared/components/ui/table";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import truncateText from "@/shared/utils/truncateText";
import { IBooking } from "@/interfaces/dashboard/bookings";
import convertDay from "@/shared/utils/convertDayLang";
import formatDateTime from "@/shared/utils/formatDate";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import BookingStatus from "@/components/dashboard/bookings/BookingStatus";

interface IProps {
  bookings: IBooking[];
}
const DoctorBookingsList = ({ bookings }: IProps) => {
  if (!bookings.length)
    return (
      <motion.tr
        initial="hidden"
        animate="visible"
        variants={tableRowVariants}
        className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
      >
        <TableCell
          colSpan={10}
          className="py-5 text-center text-sm font-medium text-black dark:text-white"
        >
          لا يوجد حجوزات اليوم
        </TableCell>
      </motion.tr>
    );

  return (
    <>
      {bookings?.map((booking, index) => (
        <motion.tr
          key={booking?.id}
          initial="hidden"
          animate="visible"
          custom={index}
          variants={tableRowVariants}
          className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
        >
          <TableCell className="w-20 py-3 text-center text-sm font-medium text-black dark:text-white">
            {booking?.code}
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {truncateText(booking?.patient?.name, 20)}
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {booking?.patient?.first_phone}
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {booking?.clinic.name}
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            <BookingStatus status={booking.status} />
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {convertDay(booking?.day, "en")}
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {booking?.start_at}
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {formatDateTime(booking?.booking_date as string)}
          </TableCell>
          <TableCell className="text-center">
            <TooltipButton title="إصدار روشتة">
              <Button className="bg-primary h-auto gap-2 px-0 py-0 text-sm text-white dark:text-black">
                <Link
                  to={`/doctor/bookings/${booking?.id}/prescriptions/create`}
                  className="flex h-9 w-9 items-center justify-center gap-2 px-1 py-1"
                >
                  <LiaNotesMedicalSolid size={20} />
                </Link>
              </Button>
            </TooltipButton>
          </TableCell>
        </motion.tr>
      ))}
    </>
  );
};

export default DoctorBookingsList;
