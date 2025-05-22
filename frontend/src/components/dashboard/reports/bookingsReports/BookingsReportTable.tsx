import DataTable from "@/components/ui/DataTable";
import BookingsTableHeader from "./BookingsTableHeader";
import BookingsReportHeader from "./BookingsReportHeader";
import BookingsReportList from "./BookingsReportList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { useGetBookingsReport } from "@/lib/react-query/dashboard/reports";
import { IBookingsReportFilter } from "@/interfaces/dashboard/reports";

const BookingsReportTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const filters: IBookingsReportFilter = useMemo(
    () => ({
      booking_date: searchParams.get("booking_date") || "",
      doctor: searchParams.get("doctor") || "",
      clinic: searchParams.get("clinic") || "",
      patient: searchParams.get("patient") || "",
      end_at: searchParams.get("end_at") || "",
      start_at: searchParams.get("start_at") || "",
      status: searchParams.get("status") || "",
    }),
    [searchParams]
  );

  const setFilters = (newFilters: IBookingsReportFilter) => {
    const params = new URLSearchParams(searchParams);

    // Update each filter param
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params);
  };
  console.log(filters);
  const doctor = useDebounce(filters.doctor, 500);
  const patient = useDebounce(filters.patient, 500);

  const {
    data: bookings,
    isLoading,
    isError,
  } = useGetBookingsReport({
    token,
    page,
    filter: {
      ...(filters.doctor && { doctor }),
      ...(filters.patient && { patient }),

      ...(filters.booking_date && { booking_date: filters.booking_date }),

      ...(filters.status !== "all" &&
        filters.status !== "" && { status: filters.status }),

      ...(filters.clinic !== "all" &&
        filters.clinic !== "" && {
          clinic_name: filters.clinic,
        }),
    },
    ...(filters.start_at ? { start_at: filters.start_at } : {}),
    ...(filters.end_at ? { end_at: filters.end_at } : {}),
  });

  useEffect(() => {
    if (bookings?.message && !bookings.status) toast.error(bookings.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [bookings?.message, bookings?.status, isError]);

  return (
    <DataTable
      isLoading={isLoading}
      header={
        <BookingsReportHeader filters={filters} setFilters={setFilters} />
      }
      tableHeader={<BookingsTableHeader />}
      list={<BookingsReportList bookings={bookings?.data?.items || []} />}
      skeleton={<TableSkeleton columns={9} rows={6} actionButtons={4} />}
      pagination={
        bookings?.data && {
          meta: bookings.data?.meta,
        }
      }
    />
  );
};

export default BookingsReportTable;
