import DataTable from "@/shared/components/ui/DataTable";
import DoctorBookingsHeader from "./DoctorBookingsHeader";
import DoctorBookingsTableHeader from "./DoctorBookingsTableHeader";
import DoctorBookingsList from "./DoctorBookingsList";
import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { useGetDoctorBookings } from "@/shared/lib/react-query/doctor/doctorBookings";
import cookieServices from "@/shared/utils/cookieServices";

const DoctorBookingsTable = ({ clinicId }: { clinicId: number }) => {
  const token = cookieServices.getToken()!;
  const { data: bookings, isLoading } = useGetDoctorBookings({
    token,
    clinicId,
  });

  return (
    <DataTable
      isLoading={isLoading}
      header={<DoctorBookingsHeader />}
      tableHeader={<DoctorBookingsTableHeader />}
      list={<DoctorBookingsList bookings={bookings?.data.items || []} />}
      skeleton={<TableSkeleton columns={8} rows={8} actionButtons={1} />}
    />
  );
};

export default DoctorBookingsTable;
