import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { DataTable } from "@/shared/components/data-table";
import { useBookingsColumns } from "./BookingsColumns";
import { IPaginationMeta } from "@/shared/types";
import { IBooking } from "../types";

interface IProps {
  bookings: IBooking[];
  isLoading: boolean;
  meta?: IPaginationMeta;
}
export const BookingsTable = ({ bookings, isLoading, meta }: IProps) => {
  const canUpdateBooking = useHasPermission(PERMISSIONS.UPDATE_BOOKING);
  const canDeleteBooking = useHasPermission(PERMISSIONS.DELETE_BOOKING);
  const canViewBooking = useHasPermission(PERMISSIONS.VIEW_BOOKING);

  const canCreateTransaction = useHasPermission(PERMISSIONS.ADD_TRANSACTION);

  const columns = useBookingsColumns();
  return (
    <DataTable
      data={bookings || []}
      columns={columns}
      isLoading={isLoading}
      emptyMessage="لا يوجد حجوزات اليوم"
      skeleton={
        <TableSkeleton
          columns={
            canCreateTransaction ||
            canDeleteBooking ||
            canUpdateBooking ||
            canViewBooking
              ? 7
              : 6
          }
          rows={6}
          actionButtons={4}
        />
      }
      meta={meta}
    />
  );
};
