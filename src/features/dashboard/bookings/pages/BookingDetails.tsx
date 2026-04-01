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
  LucideUserCircle,
  LucideBuilding2,
  LucideCalendar,
  LucideClock,
  LucideTag,
  LucidePhone,
  LucidePen,
  LucideFileText,
  LucideStethoscope,
  LucideClipboardList,
  LucideIdCard,
  LucideArrowRight,
} from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
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
import { MdPendingActions } from "react-icons/md";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { cn } from "@/shared/lib/utils";

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
    action,
  } = booking?.data || {};

  // Get status color and label
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return {
          color: "from-yellow-400 to-yellow-600",
          label: "معلق",
          textColor: "text-yellow-600",
          bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
        };
      case "collected":
        return {
          color: "from-green-400 to-green-600",
          label: "محصل",
          textColor: "text-green-600",
          bgColor: "bg-green-50 dark:bg-green-950/30",
        };
      case "completed":
        return {
          color: "from-blue-400 to-blue-600",
          label: "مكتمل",
          textColor: "text-blue-600",
          bgColor: "bg-blue-50 dark:bg-blue-950/30",
        };
      case "cancelled":
        return {
          color: "from-red-400 to-red-600",
          label: "ملغى",
          textColor: "text-red-600",
          bgColor: "bg-red-50 dark:bg-red-950/30",
        };
      default:
        return {
          color: "from-gray-400 to-gray-600",
          label: status,
          textColor: "text-gray-600",
          bgColor: "bg-gray-50 dark:bg-gray-950/30",
        };
    }
  };

  const statusInfo = getStatusInfo(status || "");

  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_WEB_NAME} | {patient?.name || " "}
        </title>
      </Helmet>

      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-4 gap-2"
        onClick={() => navigate(-1)}
      >
        <LucideArrowRight className="h-4 w-4" />
        رجوع
      </Button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Right Sidebar - Booking Summary */}
        <div className="lg:col-span-4">
          <Card className="overflow-hidden border-0 shadow-lg">
            {/* Gradient Cover */}
            <div
              className={cn("h-32 w-full bg-linear-to-br", statusInfo.color)}
            />

            {/* Decorative Circle */}
            <div className="relative -mt-16 flex justify-center">
              <div className="rounded-full bg-white p-1 shadow-xl dark:bg-gray-900">
                <Avatar className="h-28 w-28 border-4 border-white dark:border-gray-900">
                  <AvatarImage
                    src={patient?.personal_image || ""}
                    alt={patient?.name}
                  />
                  <AvatarFallback className="bg-primary/10 text-3xl">
                    {patient?.name?.charAt(0) || "م"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            <CardContent className="flex flex-col items-center px-6 pb-6">
              {/* Patient Name */}
              <div className="mt-3 text-center">
                <Link
                  to={`/dashboard/patients/${patient?.id}`}
                  className="hover:text-primary text-xl font-bold transition-colors"
                >
                  {patient?.name}
                </Link>
                <div className="text-muted-foreground mt-1 flex items-center justify-center gap-1">
                  <LucideIdCard className="h-3 w-3" />
                  <span className="text-sm">{patient?.personal_id}</span>
                </div>
              </div>

              {/* Status Badge */}

              <div className="mt-4 flex w-full justify-center">
                <UpdateBookingStatus booking={booking?.data as IBooking} />
              </div>

              {/* Booking Code Card */}
              <div
                className={cn("mt-4 w-full rounded-xl p-4", statusInfo.bgColor)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "border-border flex h-10 w-10 items-center justify-center rounded-lg border border-dashed",
                        statusInfo.color,
                        "shadow-lg"
                      )}
                    >
                      <LucideTag className="text-foreground h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">رقم الحجز</p>
                      <p className="text-xl font-bold">{code}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Info */}
              <div className="mt-4 w-full">
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-900/30">
                    <MdPendingActions className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">الخدمة</p>
                    <p className="font-medium">{action?.name}</p>
                  </div>
                </div>
              </div>

              {/* Patient Contact */}
              <div className="mt-3 w-full space-y-2">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <LucidePhone className="text-muted-foreground h-4 w-4" />
                    <span className="text-muted-foreground text-sm">
                      الهاتف
                    </span>
                  </div>
                  <span className="font-medium">{patient?.first_phone}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 w-full space-y-2">
                {canUpdateBooking &&
                  status !== "collected" &&
                  status !== "completed" && (
                    <Button variant="outline" className="w-full gap-2" asChild>
                      <Link
                        to={`/dashboard/bookings/${booking?.data.id}/update`}
                      >
                        <LucidePen className="h-4 w-4" />
                        تعديل الحجز
                      </Link>
                    </Button>
                  )}
                {canDeleteBooking && status !== "cancelled" && (
                  <DeleteAlert
                    name={`حجز المريض ${patient?.name} رقم ${code}`}
                    deleteAction={() =>
                      deleteBooking({ id: id?.toString() || "" })
                    }
                    className="w-full rounded-lg"
                  />
                )}
                {canCreatePrescription && status === "collected" && (
                  <Button
                    className="w-full gap-2 bg-linear-to-r from-green-500 to-green-600"
                    asChild
                  >
                    <Link to={`/dashboard/bookings/${id}/prescriptions/create`}>
                      <LiaNotesMedicalSolid size={20} />
                      إضافة روشتة
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Left Side - Tabs */}
        <div className="lg:col-span-8">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="mb-4 grid h-auto w-full grid-cols-3 gap-2">
              <TabsTrigger value="details" className="gap-2 py-2.5">
                <LucideClipboardList className="h-4 w-4" />
                <span className="hidden sm:inline">التفاصيل</span>
              </TabsTrigger>
              <TabsTrigger value="doctor" className="gap-2 py-2.5">
                <LucideStethoscope className="h-4 w-4" />
                <span className="hidden sm:inline">الطبيب</span>
              </TabsTrigger>
              <TabsTrigger value="clinic" className="gap-2 py-2.5">
                <LucideBuilding2 className="h-4 w-4" />
                <span className="hidden sm:inline">العيادة</span>
              </TabsTrigger>
            </TabsList>

            {/* Booking Details Tab */}
            <TabsContent value="details">
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
                      <LucideClipboardList className="text-primary h-4 w-4" />
                    </div>
                    تفاصيل الحجز
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <InfoField
                        icon={
                          <MdPendingActions className="h-4 w-4 text-rose-500" />
                        }
                        label="الخدمة"
                        value={action?.name as string}
                      />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <InfoField
                        icon={<LucideClock className="h-4 w-4 text-blue-500" />}
                        label="موعد الدخول"
                        value={start_at || ""}
                      />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <InfoField
                        icon={
                          <LucideCalendar className="h-4 w-4 text-orange-500" />
                        }
                        label="تاريخ الحجز"
                        value={
                          booking_date
                            ? formatDateTime(booking_date, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : ""
                        }
                      />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <InfoField
                        icon={
                          <LucideCalendar className="h-4 w-4 text-purple-500" />
                        }
                        label="اليوم"
                        value={convertDay(day || "", "en")}
                      />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <InfoField
                        icon={<LucideTag className="h-4 w-4 text-cyan-500" />}
                        label="رقم الحجز"
                        value={code?.toString() || ""}
                      />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <InfoField
                        icon={
                          <LucideFileText className="h-4 w-4 text-red-500" />
                        }
                        label="رقم الهوية"
                        value={patient?.personal_id || ""}
                      />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <InfoField
                        icon={
                          <LucideUserCircle className="h-4 w-4 text-green-500" />
                        }
                        label="الموظف"
                        value={employee?.name || ""}
                      />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <InfoField
                        icon={
                          <LucideCalendar className="h-4 w-4 text-teal-500" />
                        }
                        label="تاريخ الإنشاء"
                        value={
                          created_at
                            ? formatDateTime(created_at, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : ""
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Doctor Tab */}
            <TabsContent value="doctor">
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <LucideStethoscope className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    معلومات الطبيب
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* Doctor Profile Card */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <Avatar className="h-32 w-32">
                        <AvatarImage
                          src={doctor?.image || ""}
                          alt={doctor?.name}
                        />
                        <AvatarFallback className="bg-blue-100 text-3xl dark:bg-blue-900/30">
                          {doctor?.name?.charAt(0) || "ط"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 shadow-lg">
                        <LucideStethoscope className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <Link
                        to={`/dashboard/doctors/${doctor?.id}`}
                        className="text-2xl font-bold transition-colors hover:text-blue-600"
                      >
                        {doctor?.name}
                      </Link>
                      <p className="text-muted-foreground mt-1">طبيب</p>
                    </div>
                  </div>

                  {/* Doctor Details Grid */}
                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                    <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30">
                      <InfoField
                        icon={<LucideTag className="h-4 w-4 text-blue-600" />}
                        label="رقم القيد"
                        value={doctor?.register_id || ""}
                      />
                    </div>
                    <div className="rounded-lg bg-green-50 p-3 dark:bg-green-950/30">
                      <InfoField
                        icon={
                          <LucidePhone className="h-4 w-4 text-green-600" />
                        }
                        label="رقم الهاتف"
                        value={doctor?.first_phone || ""}
                      />
                    </div>
                    <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-950/30">
                      <InfoField
                        icon={
                          <LucideUserCircle className="h-4 w-4 text-purple-600" />
                        }
                        label="الجنس"
                        value={
                          doctor?.gender === "Male"
                            ? "ذكر"
                            : doctor?.gender === "Female"
                              ? "انثى"
                              : ""
                        }
                      />
                    </div>
                    <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-950/30">
                      <InfoField
                        icon={
                          <LucideBuilding2 className="h-4 w-4 text-orange-600" />
                        }
                        label="العيادة"
                        value={clinic?.name || ""}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Clinic Tab */}
            <TabsContent value="clinic">
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                      <LucideBuilding2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    معلومات العيادة
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* Clinic Profile Card */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-purple-600 shadow-lg">
                      <LucideBuilding2 className="h-16 w-16 text-white" />
                    </div>
                    <div className="mt-4 text-center">
                      <h2 className="text-2xl font-bold">{clinic?.name}</h2>
                      <p className="text-muted-foreground mt-1">عيادة</p>
                    </div>
                  </div>

                  {/* Clinic Details */}
                  <div className="mt-6 grid grid-cols-1 gap-4">
                    <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-950/30">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500 shadow-lg">
                          <LucideBuilding2 className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">
                            اسم العيادة
                          </p>
                          <p className="text-lg font-semibold">
                            {clinic?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
