import { TableCell } from "@/shared/components/ui/table";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import truncateText from "@/shared/utils/truncateText";
import { IBooking } from "@/interfaces/dashboard/bookings";
import convertDay from "@/shared/utils/convertDayLang";
import formatDateTime from "@/shared/utils/formatDate";
import BookingStatus from "../../bookings/BookingStatus";
import { TBookingStatus } from "@/shared/types";

interface IProps {
  bookings: IBooking[];
}
const BookingsReportList = ({ bookings }: IProps) => {
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
            {truncateText(booking?.patient?.name || "غير معروف", 20)}
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {booking?.patient?.first_phone}
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {booking?.clinic.name || "غير معروف"}
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {truncateText(booking?.doctor?.name || "غير معروف", 15)}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            <BookingStatus status={booking.status as TBookingStatus} />
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

          <TableCell className="text-center"></TableCell>
        </motion.tr>
      ))}
    </>
  );
};

export default BookingsReportList;
