import DataTable from "@/components/ui/DataTable";
import BookingsTableHeader from "./BookingsTableHeader";
import BookingsHeaderActions from "./BookingsActions";
import BookingsList from "./BookingsList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllBookings } from "@/lib/react-query/dashboard/bookings";

const BookingsTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [sort, setSort] = useState(false);
  const [filters, setFilters] = useState({
    doctor: "",
    patient: "",
    created_at: "",
    booking_date: "",
    status: "",
    clinic_name: "",
  });

  const doctor = useDebounce(filters.doctor, 500);
  const patient = useDebounce(filters.patient, 500);
  const created_at = useDebounce(filters.created_at, 500);
  const booking_date = useDebounce(filters.booking_date, 500);
  const clinic_name = useDebounce(filters.clinic_name, 500);
  const status = useDebounce(filters.status, 500);

  const {
    data: bookings,
    isLoading,
    isError,
    isRefetching,
  } = useGetAllBookings({
    token,
    page,
    sort: sort ? "date" : "-date",
    filter: {
      ...(filters.doctor && { doctor }),
      ...(filters.patient && { patient }),
      ...(filters.created_at && created_at && { created_at }),
      ...(filters.booking_date && booking_date && { booking_date }),
      ...(filters.status && status !== "all" && { status }),
      ...(filters.clinic_name && clinic_name !== "all" && { clinic_name }),
    },
  });

  useEffect(() => {
    if (bookings?.message) toast.error(bookings.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [bookings?.message, isError]);

  return (
    <DataTable
      isLoading={isLoading}
      actions={
        <BookingsHeaderActions
          filters={filters}
          setFilters={setFilters}
          isLoading={isRefetching}
        />
      }
      header={<BookingsTableHeader setSort={setSort} sort={sort} />}
      list={<BookingsList bookings={bookings?.data?.items || []} />}
      skeleton={<TableSkeleton columns={7} rows={6} actionButtons={3} />}
      pagination={
        bookings?.data && {
          meta: bookings.data?.meta,
        }
      }
    />
  );
};

export default BookingsTable;
