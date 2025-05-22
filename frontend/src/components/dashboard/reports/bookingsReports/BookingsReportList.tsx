import { TableCell } from "@/components/ui/table";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import truncateText from "@/utils/truncateText";
import { IBooking } from "@/interfaces/dashboard/bookings";
import convertDay from "@/utils/convertDayLang";
import formatDateTime from "@/utils/formatDate";
import BookingStatus from "../../bookings/BookingStatus";
import { TBookingStatus } from "@/types";

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
        className="dark:border-muted !bg-white/40 dark:!bg-dark/40 hover:!bg-gray-200 dark:hover:!bg-dark transition-all duration-300"
      >
        <TableCell
          colSpan={10}
          className="text-sm text-center text-black dark:text-white py-5 font-medium"
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
          className="dark:border-muted !bg-white/40 dark:!bg-dark/40 hover:!bg-gray-200 dark:hover:!bg-dark transition-all duration-300"
        >
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium w-20">
            {booking?.code}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
            {truncateText(booking?.patient?.name || "غير معروف", 20)}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {booking?.patient?.first_phone}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
            {booking?.clinic.name || "غير معروف"}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
            {truncateText(booking?.doctor?.name || "غير معروف", 15)}
          </TableCell>

          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
            <BookingStatus status={booking.status as TBookingStatus} />
          </TableCell>

          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {convertDay(booking?.day, "en")}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
            {booking?.start_at}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
            {formatDateTime(booking?.booking_date as string)}
          </TableCell>

          <TableCell className="text-center"></TableCell>
        </motion.tr>
      ))}
    </>
  );
};

export default BookingsReportList;
