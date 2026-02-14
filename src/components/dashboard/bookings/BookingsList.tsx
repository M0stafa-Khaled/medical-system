import { TableCell } from "@/shared/components/ui/table";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import truncateText from "@/shared/utils/truncateText";
import { IBooking } from "@/interfaces/dashboard/bookings";
import convertDay from "@/shared/utils/convertDayLang";
import formatDateTime from "@/shared/utils/formatDate";
import UpdateBookingStatus from "./UpdateBookingStatus";
import CreateTransaction from "../transactions/CreateTransaction";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router";
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
            <UpdateBookingStatus booking={booking} />
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
          {(canDeleteBooking ||
            canUpdateBooking ||
            canViewBooking ||
            canCreateTransaction) && (
            <TableCell className="text-center">
              <div className="flex items-center justify-center gap-2">
                {canCreatePrescription && booking.status === "collected" && (
                  <TooltipButton title="إصدار روشتة">
                    <Button className="bg-primary h-auto gap-2 px-0 py-0 text-sm text-white dark:text-black">
                      <Link
                        to={`/dashboard/bookings/${booking?.id}/prescriptions/create`}
                        className="flex h-9 w-9 items-center justify-center gap-2 px-1 py-1"
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
                    <Button className="bg-primary h-auto gap-2 px-0 py-0 text-sm text-white dark:text-black">
                      <Link
                        to={`/dashboard/bookings/${booking?.id}`}
                        className="flex h-9 w-9 items-center justify-center gap-2 px-1 py-1"
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
                      <Button className="h-auto gap-2 bg-blue-600 px-0 py-0 text-sm hover:bg-blue-700">
                        <Link
                          to={`/dashboard/bookings/${booking?.id}/update`}
                          className="flex h-9 w-9 items-center justify-center gap-2 px-1 py-1 text-white"
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
