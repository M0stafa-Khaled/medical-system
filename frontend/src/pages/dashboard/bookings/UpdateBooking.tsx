import { Card, CardContent } from "@/components/ui/card";
import cookieServices from "@/utils/cookieServices";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import DataLoader from "@/components/ui/DataLoader";
import { useGetBookingById } from "@/lib/react-query/dashboard/bookings";
import BookingForm from "@/components/forms/dashboard/bookings/BookingForm";
import { updateBookingSchema } from "@/validations/dashboard/bookingSchema";
import { AxiosResErr } from "@/types";

const UpdateBooking = () => {
  const navigate = useNavigate();
  const token = cookieServices.getToken()!;

  const { bookingId } = useParams();
  const {
    data: booking,
    isLoading,
    isError,
    failureReason,
  } = useGetBookingById({
    id: bookingId!,
    token,
  });

  const bookingFailure = failureReason as AxiosResErr;

  useEffect(() => {
    if (isError || bookingFailure?.response?.data.message) {
      toast.error(
        bookingFailure.response?.data.message || "فشل في تحميل بيانات الحجز"
      );
      navigate("/dashboard/bookings");
      return;
    }
  }, [isError, navigate, bookingFailure]);

  if (isLoading) return <DataLoader />;

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تعديل حجز</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-6"
      >
        <Card className="mt-10 dark:bg-foreground border-muted">
          <div className="flex flex-col space-y-1.5 p-6">
            <h1 className="font-semibold leading-none tracking-tight">
              تحديث بيانات الحجز
            </h1>
          </div>
          <CardContent>
            <BookingForm
              action={"update"}
              bookingSchema={updateBookingSchema}
              booking={booking?.data}
            />
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default UpdateBooking;
