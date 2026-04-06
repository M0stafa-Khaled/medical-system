import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import { useGetAllBookings } from "../queriesAndMutations";
import { IBookingsFilter } from "@/features/dashboard/bookings/types";
import { BookingsHeader } from "../components/BookingsHeader";
import { BookingsTable } from "../components/BookingsTable";

const Bookings = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const filters: IBookingsFilter = useMemo(
    () => ({
      doctor: searchParams.get("doctor") || "",
      patient: searchParams.get("patient") || "",
      created_at: searchParams.get("created_at") || "",
      booking_date: searchParams.get("booking_date") || "",
      status: searchParams.get("status") || "",
      clinic: searchParams.get("clinic") || "",
      sort: searchParams.get("sort") || "",
    }),
    [searchParams]
  );

  const doctor = useDebounce(filters.doctor, 500);
  const patient = useDebounce(filters.patient, 500);

  const {
    data: bookings,
    isLoading,
    isError,
    isRefetching,
  } = useGetAllBookings({
    page,
    sort: filters.sort ? "date" : "-date",
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

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | الحجوزات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <BookingsHeader
          isLoading={isRefetching || isLoading}
          meta={bookings?.data.meta}
        />
        <BookingsTable
          bookings={bookings?.data.items || []}
          isLoading={isLoading}
          meta={bookings?.data.meta}
        />
      </motion.section>
    </>
  );
};

export default Bookings;
