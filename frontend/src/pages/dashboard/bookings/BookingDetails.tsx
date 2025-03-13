import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataLoader from "@/components/ui/DataLoader";
import { useGetBookingById } from "@/lib/react-query/dashboard/bookings";
import cookieServices from "@/utils/cookieServices";
import {
  User2,
  UserCircle2,
  Building2,
  Calendar,
  Clock,
  Tag,
  CheckCheck,
  Phone,
} from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import InfoField from "@/components/dashboard/InfoField";
import convertDay from "@/utils/convertDayLang";
import formatDateTime from "@/utils/formatDate";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { Button } from "@/components/ui/button";
import { FaPencil } from "react-icons/fa6";
import DeleteBookingButton from "@/components/dashboard/booking/DeleteBookingModalButton";
import UpdateBookingStatus from "@/components/dashboard/booking/UpdateBookingStatus";

const BookingDetails = () => {
  const canEditBooking = useHasPermission(PERMISSIONS.EDIT_BOOKING);
  const canDeleteBooking = useHasPermission(PERMISSIONS.DELETE_BOOKING);

  const navigate = useNavigate();
  const token = cookieServices.getToken()!;
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    isError,
  } = useGetBookingById({
    id: bookingId!,
    token,
  });

  useEffect(() => {
    if (isError) {
      toast.error("فشل في تحميل بيانات الحجز");
      navigate("/dashboard/bookings");
      return;
    }
    if (!booking?.status && booking?.message) {
      toast.error(booking.message);
      navigate("/dashboard/bookings");
      return;
    }
  }, [isError, navigate, booking]);

  if (isLoading) return <DataLoader />;

  const {
    booking_date,
    clinic,
    code,
    created_at,
    day,
    doctor,
    id,
    patient,
    start_at,
    status,
    employee,
  } = booking?.data || {};

  return (
    <>
      <Helmet>
        <title>EgProg | {patient?.name || " "}</title>
      </Helmet>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-sm">
          <CardHeader className="py-4">
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-start sm:items-center sm:flex-row gap-4"
            >
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                <span>تفاصيل الحجز:</span>
              </CardTitle>
              <div className="flex gap-2">
                {canEditBooking && (
                  <motion.div variants={itemVariants}>
                    <Button className="h-auto py-0 px-0 bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm">
                      <Link
                        to={`/dashboard/bookings/${id}/update`}
                        className="flex justify-center items-center gap-2 py-1 px-1 w-9 h-9"
                      >
                        <FaPencil size={18} />
                      </Link>
                    </Button>
                  </motion.div>
                )}
                {canDeleteBooking && status !== "cancelled" && (
                  <motion.div variants={itemVariants}>
                    <DeleteBookingButton
                      name={patient?.name as string}
                      id={id?.toString() as string}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </CardHeader>

          <CardContent>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <Link to={`/dashboard/patients/${patient?.id}`}>
                  <InfoField
                    icon={<User2 className="h-5 w-5 text-primary" />}
                    label="المريض"
                    value={patient?.name as string}
                  />
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<Phone className="text-green-600" />}
                  label="رقم الهاتف الاول"
                  value={patient?.first_phone as string}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<Phone className="text-purple-600" />}
                  label="رقم الهاتف الثاني"
                  value={
                    patient?.second_phone ? patient.second_phone : "لا يوجد"
                  }
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link to={`/dashboard/doctors/${doctor?.id}`}>
                  <InfoField
                    icon={<UserCircle2 className="h-5 w-5 text-blue-500" />}
                    label="الطبيب"
                    value={doctor?.name || ""}
                  />
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link to={`/dashboard/employees/${employee?.id}`}>
                  <InfoField
                    icon={<UserCircle2 className="h-5 w-5 text-blue-500" />}
                    label="الموظف"
                    value={employee?.name || ""}
                  />
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<Building2 className="h-5 w-5 text-purple-500" />}
                  label="العيادة"
                  value={clinic!}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<Calendar className="h-5 w-5 text-orange-500" />}
                  label="تاريخ الحجز"
                  value={formatDateTime(booking_date!)}
                  sm
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<Clock className="h-5 w-5 text-teal-500" />}
                  label="موعد الدخول"
                  value={start_at!}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<Calendar className="h-5 w-5 text-indigo-500" />}
                  label="اليوم"
                  value={convertDay(day!, "en")}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<Tag className="h-5 w-5 text-cyan-500" />}
                  label="رقم الحجز"
                  value={code!}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <CheckCheck className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-sm text-muted-foreground text-nowrap">
                      الحالة:
                    </h5>
                    <UpdateBookingStatus
                      status={status!}
                      clinic_name={clinic!}
                      id={`${id}`}
                      doctor_id={`${doctor?.id}`}
                      patient_id={`${patient?.id}`}
                      working_day_id={`${day}`}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<Calendar className="h-5 w-5 text-yellow-500" />}
                  label="تاريخ الإنشاء"
                  value={formatDateTime(created_at!)}
                  sm
                />
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default BookingDetails;
