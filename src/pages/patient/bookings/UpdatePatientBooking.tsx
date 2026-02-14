import PatientBookingForm from "@/components/forms/patient/PatientBookingForm";
import { Card, CardContent } from "@/shared/components/ui/card";
import DataLoader from "@/shared/components/ui/DataLoader";
import { IPatientBooking } from "@/interfaces/patient/patientBookings";
import { useGetPatientBookingById } from "@/shared/lib/react-query/patient/patientBookings";
import { AxiosResErr } from "@/shared/types";
import cookieServices from "@/shared/utils/cookieServices";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const UpdatePatientBooking = () => {
  const navigate = useNavigate();
  const token = cookieServices.getToken()!;

  const { bookingId } = useParams();
  const {
    data: booking,
    isLoading,
    isError,
    failureReason,
  } = useGetPatientBookingById({
    id: bookingId!,
    token,
  });

  const bookingFailure = failureReason as AxiosResErr;

  useEffect(() => {
    if (isError || bookingFailure?.response?.data.message) {
      toast.error(
        bookingFailure.response?.data.message || "فشل في تحميل بيانات الحجز"
      );
      navigate("/bookings");
      return;
    }
  }, [isError, navigate, bookingId, bookingFailure]);

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
        className="mt-10 xl:container"
      >
        <div className="lg:container">
          <Card className="dark:bg-foreground dark:border-muted border-gray-300 shadow-none">
            <div className="space-y-1.5 p-6">
              <h1 className="leading-relaxed font-semibold">
                تحديث بيانات الحجز
              </h1>
            </div>
            <CardContent>
              <PatientBookingForm
                action={"update"}
                booking={booking?.data as IPatientBooking}
              />
            </CardContent>
          </Card>
        </div>
      </motion.section>
    </>
  );
};

export default UpdatePatientBooking;
