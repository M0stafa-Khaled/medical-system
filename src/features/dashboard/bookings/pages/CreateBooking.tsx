import { BookingForm } from "../components/BookingForm";
import { Card, CardContent } from "@/shared/components/ui/card";
import { createBookingSchema } from "../schema";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Button } from "@/shared/components/ui/button";
import { LucideArrowRight, CalendarPlus } from "lucide-react";
import { useNavigate } from "react-router";

const CreateBooking = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | إضافة حجز</title>
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
          className="relative mb-6 overflow-hidden rounded-xl border border-gray-200 bg-linear-to-br from-blue-50 to-violet-50 p-4 shadow-sm sm:p-6 dark:border-gray-800 dark:from-blue-950/20 dark:to-violet-950/20"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-violet-600 shadow-lg shadow-blue-500/30 sm:h-14 sm:w-14 dark:shadow-blue-500/20">
              <CalendarPlus className="h-6 w-6 text-white sm:h-7 sm:w-7" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                إضافة حجز جديد
              </h1>
              <p className="truncate text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                قم بملء البيانات التالية لإضافة حجز جديد
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
                action={"create"}
                bookingSchema={createBookingSchema}
              />
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>
    </>
  );
};

export default CreateBooking;
