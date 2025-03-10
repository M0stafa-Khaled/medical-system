import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DeleteBookingButton from "./DeleteBookingModalButton";
import { FaPencil } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations/dashboardAnimations";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import truncateText from "@/utils/truncateText";
import { IBooking } from "@/interfaces/dashboard/bookings";
import convertDay from "@/utils/convertDayLang";
import BookingStatus from "./BookingStatus";
import formatDateTime from "@/utils/formatDate";

interface IProps {
  bookings: IBooking[];
}
const BookingsList = ({ bookings }: IProps) => {
  const canEditBooking = useHasPermission(PERMISSIONS.EDIT_BOOKING);
  const canDeleteBooking = useHasPermission(PERMISSIONS.DELETE_BOOKING);
  const canViewBooking = useHasPermission(PERMISSIONS.VIEW_BOOKING);

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
          لا يوجد حجوزات
        </TableCell>
      </motion.tr>
    );

  return (
    <>
      {bookings.map(
        (
          {
            id,
            code,
            status,
            patient,
            clinic,
            doctor,
            booking_date,
            day,
            start_at,
          },
          index
        ) => (
          <motion.tr
            key={id}
            initial="hidden"
            animate="visible"
            custom={index}
            variants={tableRowVariants}
            className="dark:border-muted !bg-white/40 dark:!bg-dark/40 hover:!bg-gray-200 dark:hover:!bg-dark transition-all duration-300"
          >
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium w-20">
              {code}
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
              {truncateText(patient?.name, 18)}
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
              {patient?.first_phone}
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
              {clinic}
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
              {truncateText(doctor?.name, 15)}
            </TableCell>

            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
              <BookingStatus status={status} />
            </TableCell>

            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
              {convertDay(day, "en")}
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
              {start_at}
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
              {formatDateTime(booking_date!)}
            </TableCell>

            {(canDeleteBooking || canEditBooking || canViewBooking) && (
              <TableCell className="text-center">
                <div className="flex justify-center items-center gap-2">
                  {canViewBooking && (
                    <Button className="h-auto py-0 px-0 bg-primary text-white dark:text-black gap-2 text-sm ">
                      <Link
                        to={`/dashboard/bookings/${id}`}
                        className="flex justify-center items-center gap-2 py-1 px-1 h-9 w-9"
                      >
                        <FiEye size={24} />
                      </Link>
                    </Button>
                  )}
                  {canEditBooking && (
                    <Button className="h-auto py-0 px-0 bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm">
                      <Link
                        to={`/dashboard/bookings/${id}/update`}
                        className="flex justify-center items-center gap-2 py-1 px-1 w-9 h-9"
                      >
                        <FaPencil size={18} />
                      </Link>
                    </Button>
                  )}
                  {canDeleteBooking && status !== "cancelled" && (
                    <DeleteBookingButton
                      name={patient?.name}
                      id={id.toString()}
                    />
                  )}
                </div>
              </TableCell>
            )}
          </motion.tr>
        )
      )}
    </>
  );
};

export default BookingsList;
