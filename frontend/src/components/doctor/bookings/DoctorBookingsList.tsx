import { TableCell } from "@/components/ui/table";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import truncateText from "@/utils/truncateText";
import { IBooking } from "@/interfaces/dashboard/bookings";
import convertDay from "@/utils/convertDayLang";
import formatDateTime from "@/utils/formatDate";
import TooltipButton from "@/components/ui/TooltipButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
            {truncateText(booking?.patient?.name, 20)}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {booking?.patient?.first_phone}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
            {booking?.clinic.name}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
            <BookingStatus status={booking.status} />
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
          <TableCell className="text-center">
            <TooltipButton title="إصدار روشتة">
              <Button className="h-auto py-0 px-0 bg-primary text-white dark:text-black gap-2 text-sm ">
                <Link
                  to={`/doctor/bookings/${booking?.id}/prescriptions/create`}
                  className="flex justify-center items-center gap-2 py-1 px-1 h-9 w-9"
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
