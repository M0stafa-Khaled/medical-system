import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import PatientBookingsHeader from "@/components/patient/bookings/PatientBookingsHeader";
import PatientBookingsList from "@/components/patient/bookings/PatientBookingsList";
import { useSearchParams } from "react-router-dom";
import cookieServices from "@/utils/cookieServices";
import { useEffect, useMemo } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllPatientBookings } from "@/lib/react-query/patient/patientBookings";
import { toast } from "react-toastify";
import DataTablePagination from "@/components/ui/DataTablePagination";
import BookingCardSkeleton from "@/components/ui/BookingCardSkeleton";
import { IPatientBookingsFilter } from "@/interfaces/patient/patientBookings";

const Bookings = () => {
  const token = cookieServices.getToken()!;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const filters: IPatientBookingsFilter = useMemo(
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

  const setFilters = (newFilters: IPatientBookingsFilter) => {
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

  const {
    data: bookings,
    isLoading,
    isError,
    isRefetching,
  } = useGetAllPatientBookings({
    token,
    page,
    filter: {
      ...(filters.doctor && { doctor }),

      ...(filters.created_at && { created_at: filters.created_at }),
      ...(filters.booking_date && { booking_date: filters.booking_date }),

      ...(filters.status !== "all" &&
        filters.status !== "" && { status: filters.status }),

      ...(filters.clinic !== "all" &&
        filters.clinic !== "" && {
          clinic: filters.clinic,
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

  const shouldShowPagination =
    bookings?.data && bookings.data.meta.last_page > 1;

  const currentPage = bookings?.data
    ? Math.ceil(bookings.data.meta.from / bookings.data.meta.per_page)
    : 1;

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | الحجوزات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="xl:container mt-10"
      >
        <PatientBookingsHeader
          filters={filters}
          setFilters={setFilters}
          isLoading={isRefetching}
        />
        {isLoading ? (
          <BookingCardSkeleton />
        ) : (
          <PatientBookingsList bookings={bookings?.data.items || []} />
        )}

        {shouldShowPagination && (
          <DataTablePagination
            currentPage={currentPage}
            totalPages={bookings?.data.meta.last_page || 1}
          />
        )}
      </motion.section>
    </>
  );
};

export default Bookings;
