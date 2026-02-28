import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { useGetDoctorBookings } from "../../queriesAndMutations";
import { DataTable } from "@/shared/components/data-table";
import { useDoctorBookingsColumns } from "./DoctorBookingsColumns";

export const DoctorBookingsTable = ({ clinicId }: { clinicId: string }) => {
  const { data: bookings, isLoading } = useGetDoctorBookings({
    clinicId,
  });

  const columns = useDoctorBookingsColumns();
  return (
    <DataTable
      isLoading={isLoading}
      data={bookings?.data.items || []}
      columns={columns}
      emptyMessage="لا يوجد حجوزات"
      skeleton={<TableSkeleton columns={8} rows={8} actionButtons={1} />}
    />
  );
};
