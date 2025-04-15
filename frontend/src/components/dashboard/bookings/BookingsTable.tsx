import DataTable from "@/components/ui/DataTable";
import BookingsTableHeader from "./BookingsTableHeader";
import BookingsHeader from "./BookingsHeader";
import BookingsList from "./BookingsList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllBookings } from "@/lib/react-query/dashboard/bookings";
import { IBookingsFilter } from "@/interfaces/dashboard/bookings";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";

const BookingsTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [sort, setSort] = useState(false);

  const filters: IBookingsFilter = useMemo(
    () => ({
      doctor: searchParams.get("doctor") || "",
      patient: searchParams.get("patient") || "",
      created_at: searchParams.get("created_at") || "",
      booking_date: searchParams.get("booking_date") || "",
      status: searchParams.get("status") || "",
      clinic: searchParams.get("clinic") || "",
    }),
    [searchParams]
  );

  const setFilters = (newFilters: IBookingsFilter) => {
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

  const doctor = useDebounce(filters.doctor, 500);
  const patient = useDebounce(filters.patient, 500);

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

      ...(filters.created_at && { created_at: filters.created_at }),
      ...(filters.booking_date && { booking_date: filters.booking_date }),

      ...(filters.status !== "all" &&
        filters.status !== "" && { status: filters.status }),

      ...(filters.clinic !== "all" &&
        filters.clinic !== "" && {
          clinic_name: filters.clinic,
        }),
    },
  });

  useEffect(() => {
    if (bookings?.message && !bookings.status) toast.error(bookings.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [bookings?.message, bookings?.status, isError]);

  const canUpdateBooking = useHasPermission(PERMISSIONS.UPDATE_BOOKING);
  const canDeleteBooking = useHasPermission(PERMISSIONS.DELETE_BOOKING);
  const canViewBooking = useHasPermission(PERMISSIONS.VIEW_BOOKING);

  const canCreateTransaction = useHasPermission(PERMISSIONS.ADD_TRANSACTION);

  return (
    <DataTable
      isLoading={isLoading}
      header={
        <BookingsHeader
          filters={filters}
          setFilters={setFilters}
          isLoading={isRefetching}
        />
      }
      tableHeader={<BookingsTableHeader setSort={setSort} />}
      list={<BookingsList bookings={bookings?.data?.items || []} />}
      skeleton={
        <TableSkeleton
          columns={
            canCreateTransaction ||
            canDeleteBooking ||
            canUpdateBooking ||
            canViewBooking
              ? 9
              : 8
          }
          rows={6}
          actionButtons={4}
        />
      }
      pagination={
        bookings?.data && {
          meta: bookings.data?.meta,
        }
      }
    />
  );
};

export default BookingsTable;
