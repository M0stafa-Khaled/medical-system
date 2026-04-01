import { Card, CardContent } from "@/shared/components/ui/card";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import DataLoader from "@/shared/components/ui/DataLoader";

import { AxiosResErr } from "@/shared/types";
import { useGetBookingById } from "../queriesAndMutations";
import { BookingForm } from "../components/BookingForm";
import { updateBookingSchema } from "../schema";
import { LucideArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

const UpdateBooking = () => {
  const navigate = useNavigate();

  const { bookingId } = useParams();
  const {
    data: booking,
    isLoading,
    isError,
    failureReason,
  } = useGetBookingById({
    id: bookingId!,
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
      <Button variant="ghost" className="gap-2" onClick={() => navigate(-1)}>
        <LucideArrowRight className="h-4 w-4" />
        رجوع
      </Button>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pb-10"
      >
        <Card className="border-muted mt-5">
          <div className="flex flex-col space-y-1.5 p-6">
            <h1 className="leading-none font-semibold tracking-tight">
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
