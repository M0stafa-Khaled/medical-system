import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import { IBookingsReportFilter } from "../../types";
import { useGetBookingsReport } from "../../queriesAndMutations";
import { DataTable } from "@/shared/components/data-table";
import { useBookingsReportsColumns } from "./BookingColumns";

export const BookingsReportTable = () => {
  const [searchParams] = useSearchParams();
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

  const doctor = useDebounce(filters.doctor, 500);
  const patient = useDebounce(filters.patient, 500);

  const {
    data: bookings,
    isLoading,
    isError,
  } = useGetBookingsReport({
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

  const columns = useBookingsReportsColumns();

  return (
    <DataTable
      isLoading={isLoading}
      columns={columns}
      data={bookings?.data.items || []}
      skeleton={<TableSkeleton columns={7} rows={6} showButtons={false} />}
      meta={bookings?.data?.meta}
    />
  );
};
