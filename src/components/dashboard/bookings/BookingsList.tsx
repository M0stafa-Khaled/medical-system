import { TableCell } from "@/components/ui/table";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import truncateText from "@/utils/truncateText";
import { IBooking } from "@/interfaces/dashboard/bookings";
import convertDay from "@/utils/convertDayLang";
import formatDateTime from "@/utils/formatDate";
import UpdateBookingStatus from "./UpdateBookingStatus";
import CreateTransaction from "../transactions/CreateTransaction";
import TooltipButton from "@/components/ui/TooltipButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, Pen } from "lucide-react";
import DeleteBooking from "./DeleteBooking";
import { LiaNotesMedicalSolid } from "react-icons/lia";

interface IProps {
  bookings: IBooking[];
}
const BookingsList = ({ bookings }: IProps) => {
  const canUpdateBooking = useHasPermission(PERMISSIONS.UPDATE_BOOKING);
  const canDeleteBooking = useHasPermission(PERMISSIONS.DELETE_BOOKING);
  const canViewBooking = useHasPermission(PERMISSIONS.VIEW_BOOKING);

  const canCreateTransaction = useHasPermission(PERMISSIONS.ADD_TRANSACTION);
  const canCreatePrescription = useHasPermission(PERMISSIONS.ADD_PRESCRIPTION);
  if (!bookings.length)
    return (
      <motion.tr
        initial="hidden"
        animate="visible"
        variants={tableRowVariants}
        className="dark:border-muted bg-white/40! dark:bg-dark/40! hover:bg-gray-200! dark:hover:bg-dark! transition-all duration-300"
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
          className="dark:border-muted bg-white/40! dark:bg-dark/40! hover:bg-gray-200! dark:hover:bg-dark! transition-all duration-300"
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
            <UpdateBookingStatus booking={booking} />
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
          {(canDeleteBooking ||
            canUpdateBooking ||
            canViewBooking ||
            canCreateTransaction) && (
            <TableCell className="text-center">
              <div className="flex justify-center items-center gap-2">
                {canCreatePrescription && booking.status === "collected" && (
                  <TooltipButton title="إصدار روشتة">
                    <Button className="h-auto py-0 px-0 bg-primary text-white dark:text-black gap-2 text-sm ">
                      <Link
                        to={`/dashboard/bookings/${booking?.id}/prescriptions/create`}
                        className="flex justify-center items-center gap-2 py-1 px-1 h-9 w-9"
                      >
                        <LiaNotesMedicalSolid size={20} />
                      </Link>
                    </Button>
                  </TooltipButton>
                )}

                {canCreateTransaction &&
                  (booking.status === "pending" ||
                    booking.status === "completed") && (
                    <CreateTransaction booking={booking} />
                  )}
                {canViewBooking && (
                  <TooltipButton title="عرض">
                    <Button className="h-auto py-0 px-0 bg-primary text-white dark:text-black gap-2 text-sm ">
                      <Link
                        to={`/dashboard/bookings/${booking?.id}`}
                        className="flex justify-center items-center gap-2 py-1 px-1 h-9 w-9"
                      >
                        <Eye size={20} />
                      </Link>
                    </Button>
                  </TooltipButton>
                )}
                {canUpdateBooking &&
                  booking.status !== "collected" &&
                  booking.status !== "completed" && (
                    <TooltipButton title="تعديل">
                      <Button className="h-auto py-0 px-0 bg-primary gap-2 text-sm bg-blue-600 hover:bg-blue-700">
                        <Link
                          to={`/dashboard/bookings/${booking?.id}/update`}
                          className="flex justify-center items-center gap-2 py-1 px-1 h-9 w-9 text-white"
                        >
                          <Pen size={20} />
                        </Link>
                      </Button>
                    </TooltipButton>
                  )}
                {canDeleteBooking && booking.status !== "cancelled" && (
                  <DeleteBooking
                    name={booking?.patient?.name}
                    id={booking?.id.toString()}
                  />
                )}
              </div>
            </TableCell>
          )}
        </motion.tr>
      ))}
    </>
  );
};

export default BookingsList;
