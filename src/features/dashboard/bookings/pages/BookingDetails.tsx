import { containerVariants, itemVariants } from "@/shared/animations";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import DataLoader from "@/shared/components/ui/DataLoader";
import {
  useDeleteBooking,
  useGetBookingById,
} from "@/features/dashboard/bookings/queriesAndMutations";
import {
  User2,
  UserCircle2,
  Building2,
  Calendar,
  Clock,
  Tag,
  CheckCheck,
  Phone,
  Pen,
} from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import InfoField from "@/shared/components/InfoField";
import convertDay from "@/shared/utils/convertDayLang";
import formatDateTime from "@/shared/utils/formatDate";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { UpdateBookingStatus } from "../components/UpdateBookingStatus";
import { IBooking } from "@/features/dashboard/bookings/types";
import { Button } from "@/shared/components/ui/button";
import { AxiosResErr } from "@/shared/types";
import { DeleteAlert } from "@/shared/components/delete-alert";
import { LiaNotesMedicalSolid } from "react-icons/lia";

const BookingDetails = () => {
  const canUpdateBooking = useHasPermission(PERMISSIONS.UPDATE_BOOKING);
  const canDeleteBooking = useHasPermission(PERMISSIONS.DELETE_BOOKING);
  const canCreatePrescription = useHasPermission(PERMISSIONS.ADD_PRESCRIPTION);

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
      navigate(-1);
      return;
    }
  }, [isError, navigate, bookingFailure]);

  const { mutateAsync: deleteBooking } = useDeleteBooking();

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
        <title>
          {import.meta.env.VITE_WEB_NAME} | {patient?.name || " "}
        </title>
      </Helmet>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card className="border-muted">
          <CardHeader className="py-4">
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                <span>تفاصيل الحجز:</span>
              </CardTitle>
              <div className="flex gap-2">
                {canUpdateBooking &&
                  status !== "collected" &&
                  status !== "completed" && (
                    <motion.div variants={itemVariants}>
                      <Button
                        size={"icon"}
                        className="btn-edit rounded-full"
                        asChild
                      >
                        <Link
                          to={`/dashboard/bookings/${booking?.data.id}/update`}
                        >
                          <Pen size={20} />
                        </Link>
                      </Button>
                    </motion.div>
                  )}
                {canDeleteBooking && status !== "cancelled" && (
                  <motion.div variants={itemVariants}>
                    <DeleteAlert
                      name={`حجز المريض ${patient?.name} رقم ${code}`}
                      deleteAction={() =>
                        deleteBooking({ id: id?.toString() || "" })
                      }
                    />
                  </motion.div>
                )}
                {canCreatePrescription && status === "collected" && (
                  <Button
                    className="btn-primary rounded-full"
                    size={"icon"}
                    asChild
                  >
                    <Link to={`/dashboard/bookings/${id}/prescriptions/create`}>
                      <LiaNotesMedicalSolid size={20} />
                    </Link>
                  </Button>
                )}
              </div>
            </motion.div>
          </CardHeader>

          <CardContent>
            <motion.div
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="flex items-center">
                <Link to={`/dashboard/patients/${patient?.id}`}>
                  <InfoField
                    icon={<User2 className="text-primary" size={20} />}
                    label="المريض"
                    value={patient?.name as string}
                  />
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<Phone className="text-green-600" size={20} />}
                  label="رقم الهاتف الاول"
                  value={patient?.first_phone as string}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<Phone className="text-purple-600" size={20} />}
                  label="رقم الهاتف الثاني"
                  value={
                    patient?.second_phone ? patient.second_phone : "لا يوجد"
                  }
                />
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center">
                <Link to={`/dashboard/doctors/${doctor?.id}`}>
                  <InfoField
                    icon={
                      <UserCircle2
                        className="h-5 w-5 text-blue-500"
                        size={20}
                      />
                    }
                    label="الطبيب"
                    value={doctor?.name || ""}
                  />
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link to={`/dashboard/employees/${employee?.id}`}>
                  <InfoField
                    icon={
                      <UserCircle2
                        className="h-5 w-5 text-blue-500"
                        size={20}
                      />
                    }
                    label="الموظف"
                    value={employee?.name || ""}
                  />
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={
                    <Building2 className="h-5 w-5 text-purple-500" size={20} />
                  }
                  label="العيادة"
                  value={clinic?.name as string}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={
                    <Calendar className="h-5 w-5 text-orange-500" size={20} />
                  }
                  label="تاريخ الحجز"
                  value={formatDateTime(booking_date!)}
                  sm
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<Clock className="h-5 w-5 text-teal-500" size={20} />}
                  label="موعد الدخول"
                  value={start_at!}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={
                    <Calendar className="h-5 w-5 text-indigo-500" size={20} />
                  }
                  label="اليوم"
                  value={convertDay(day!, "en")}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<Tag className="h-5 w-5 text-cyan-500" size={20} />}
                  label="رقم الحجز"
                  value={code!}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-4">
                  <div className="shrink-0">
                    <CheckCheck className="h-5 w-5 text-green-500" size={20} />
                  </div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-muted-foreground text-sm text-nowrap">
                      الحالة:
                    </h5>
                    <UpdateBookingStatus booking={booking?.data as IBooking} />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={
                    <Calendar className="h-5 w-5 text-yellow-500" size={20} />
                  }
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
