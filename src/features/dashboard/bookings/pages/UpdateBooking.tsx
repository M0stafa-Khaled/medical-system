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
import { LucideArrowRight, CalendarCog } from "lucide-react";
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

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          className="mb-4 gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => navigate(-1)}
        >
          <LucideArrowRight className="h-4 w-4" />
          رجوع
        </Button>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pb-10"
      >
        {/* Header Card - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-6 overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 shadow-sm dark:border-gray-800 dark:from-emerald-950/20 dark:to-teal-950/20 sm:p-6"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-emerald-600 to-teal-600 shadow-lg shadow-emerald-500/30 dark:shadow-emerald-500/20 sm:h-14 sm:w-14">
              <CalendarCog className="h-6 w-6 text-white sm:h-7 sm:w-7" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                تحديث بيانات الحجز
              </h1>
              <p className="truncate text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                تعديل معلومات الحجز رقم #{booking?.data?.code}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-gray-200 shadow-sm dark:border-gray-800">
            <CardContent className="p-4 sm:p-6">
              <BookingForm
                action={"update"}
                bookingSchema={updateBookingSchema}
                booking={booking?.data}
              />
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>
    </>
  );
};

export default UpdateBooking;
