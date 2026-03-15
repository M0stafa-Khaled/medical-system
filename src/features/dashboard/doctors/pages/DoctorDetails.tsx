import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import {
  LucideUser,
  LucidePhone,
  LucideMail,
  LucideIdCard,
  LucideCalendar,
  LucidePen,
  LucideBadgeCheck,
  LucideBadgeX,
  LucideUserCircle,
  LucideImage,
  LucideArrowLeft,
  LucideBuilding2,
  LucidePercent,
  LucideStethoscope,
} from "lucide-react";
import ImageModal from "@/shared/components/ImageModal";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import DataLoader from "@/shared/components/ui/DataLoader";
import { Helmet } from "react-helmet-async";
import { useDeleteDoctor, useGetDoctorById } from "../queriesAndMutations";
import { AxiosResErr } from "@/shared/types";
import { DeleteAlert } from "@/shared/components/delete-alert";
import InfoField from "@/shared/components/InfoField";
import { format } from "date-fns";
import { cn } from "@/shared/lib/utils";
import { Actions } from "../components/actions/Actions";
import { WorkingDays } from "../working-days/components/WorkingDays";

const DoctorDetails = () => {
  const canUpdateDoctor = useHasPermission(PERMISSIONS.UPDATE_DOCTOR);
  const canDeleteDoctor = useHasPermission(PERMISSIONS.DELETE_DOCTOR);
  const canViewDoctorActions = false; //|| useHasPermission(PERMISSIONS.DOCTOR_ACTIONS);
  const canViewDoctorWorkingDays = false; // useHasPermission(PERMISSIONS.WORKING_DAYS);

  const navigate = useNavigate();
  const { doctorId } = useParams();

  const {
    data: doctor,
    isLoading,
    isError,
    failureReason,
  } = useGetDoctorById({
    id: doctorId!,
  });

  const { mutateAsync: deleteDoctor } = useDeleteDoctor();

  const doctorsFailure = failureReason as AxiosResErr;

  useEffect(() => {
    if (isError || doctorsFailure?.response?.data.message) {
      toast.error(
        doctorsFailure.response?.data.message || "فشل في تحميل بيانات الطبيب"
      );
      navigate(-1);
      return;
    }
  }, [isError, navigate, doctorsFailure]);

  if (isLoading) return <DataLoader />;

  const {
    id,
    clinics,
    commission,
    created_at,
    first_phone,
    image,
    name,
    personal_id,
    register_id,
    second_phone,
    signature,
    gender,
    status,
    user,
  } = doctor?.data || {};

  const profileImage = image || "/images/avatar.svg";

  // Determine tabs based on permissions
  const tabCount =
    1 + (canViewDoctorActions ? 1 : 0) + (canViewDoctorWorkingDays ? 1 : 0);

  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_WEB_NAME} | د / {name || " "}
        </title>
      </Helmet>

      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-4 gap-2"
        onClick={() => navigate(-1)}
      >
        <LucideArrowLeft className="h-4 w-4" />
        رجوع
      </Button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Right Sidebar - Profile Card */}
        <div className="lg:col-span-4">
          <Card className="overflow-hidden border-0 shadow-lg">
            {/* Cover */}
            <div className="h-32 w-full bg-linear-to-br from-blue-500 via-blue-600 to-blue-700" />

            <CardContent className="flex flex-col items-center px-6 pb-6">
              {/* Avatar Container */}
              <div className="-mt-16">
                <div className="relative">
                  <div className="border-background bg-background h-32 w-32 overflow-hidden rounded-full border-4 shadow-xl">
                    <Avatar className="h-full w-full">
                      <AvatarImage
                        src={profileImage}
                        alt={name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-3xl">
                        {name?.charAt(0) || "د"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>

              {/* Name & Role */}
              <div className="mt-4 text-center">
                <h1 className="text-2xl font-bold">{name}</h1>
                <span className="mt-2 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  طبيب
                </span>
              </div>

              {/* Status Badge */}
              <div className="mt-3">
                {status ? (
                  <Badge variant="default" className="gap-1 bg-green-500">
                    <LucideBadgeCheck className="h-3 w-3" />
                    نشط
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="gap-1">
                    <LucideBadgeX className="h-3 w-3" />
                    غير نشط
                  </Badge>
                )}
              </div>

              {/* Clinics */}
              <div className="mt-4 w-full">
                <div className="flex flex-wrap justify-center gap-2">
                  {clinics?.map((clinic) => (
                    <Badge key={clinic.id} variant="outline" className="gap-1">
                      <LucideBuilding2 className="h-3 w-3" />
                      {clinic.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-4 w-full space-y-2">
                <div className="text-muted-foreground flex items-center justify-center gap-2">
                  <LucidePhone className="h-4 w-4" />
                  <span>{first_phone}</span>
                </div>
                <div className="text-muted-foreground flex items-center justify-center gap-2">
                  <LucideMail className="h-4 w-4" />
                  <span className="text-sm">{user?.email}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 w-full space-y-2">
                {canUpdateDoctor && (
                  <Button variant="outline" className="w-full gap-2" asChild>
                    <Link to={`/dashboard/doctors/${id}/update`}>
                      <LucidePen className="h-4 w-4" />
                      تعديل
                    </Link>
                  </Button>
                )}
                {canDeleteDoctor && (
                  <DeleteAlert
                    deleteAction={() => deleteDoctor({ id: id! })}
                    name={name!}
                    navigatePath="/dashboard/doctors"
                    className="w-full rounded-md"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Left Side - Tabs */}
        <div className="lg:col-span-8">
          <Tabs defaultValue="info" className="w-full">
            <TabsList
              className={cn(
                "mb-4 grid h-auto w-full gap-2",
                tabCount === 3
                  ? "grid-cols-4"
                  : tabCount === 2
                    ? "grid-cols-3"
                    : "grid-cols-2"
              )}
            >
              <TabsTrigger value="info" className="gap-2 py-2.5">
                <LucideUser className="h-4 w-4" />
                <span className="hidden sm:inline">المعلومات</span>
              </TabsTrigger>
              {canViewDoctorActions && (
                <TabsTrigger value="actions" className="gap-2 py-2.5">
                  <LucideStethoscope className="h-4 w-4" />
                  <span className="hidden sm:inline">الإجراءات</span>
                </TabsTrigger>
              )}
              {canViewDoctorWorkingDays && (
                <TabsTrigger value="working-days" className="gap-2 py-2.5">
                  <LucideCalendar className="h-4 w-4" />
                  <span className="hidden sm:inline">أيام العمل</span>
                </TabsTrigger>
              )}
              <TabsTrigger value="clinics" className="gap-2 py-2.5">
                <LucideBuilding2 className="h-4 w-4" />
                <span className="hidden sm:inline">العيادات</span>
              </TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="info">
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <LucideUser className="h-5 w-5" />
                    المعلومات الشخصية
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                    <InfoField
                      icon={<LucidePercent className="h-4 w-4" />}
                      label="العمولة"
                      value={commission || "غير محدد"}
                    />
                    <InfoField
                      icon={<LucideIdCard className="h-4 w-4" />}
                      label="رقم القيد"
                      value={register_id || "غير محدد"}
                    />
                    <InfoField
                      icon={<LucideUserCircle className="h-4 w-4" />}
                      label="رقم الهوية"
                      value={personal_id || "غير محدد"}
                    />
                    <InfoField
                      icon={<LucidePhone className="h-4 w-4" />}
                      label="رقم الهاتف"
                      value={first_phone || "غير محدد"}
                    />
                    <InfoField
                      icon={<LucidePhone className="h-4 w-4" />}
                      label="رقم الهاتف الثاني"
                      value={second_phone || "لا يوجد"}
                    />
                    <InfoField
                      icon={<LucideMail className="h-4 w-4" />}
                      label="البريد الإلكتروني"
                      value={user?.email || "غير محدد"}
                      sm
                    />
                    <InfoField
                      icon={<LucideUserCircle className="h-4 w-4" />}
                      label="الجنس"
                      value={
                        gender === "Male"
                          ? "ذكر"
                          : gender === "Female"
                            ? "انثى"
                            : "غير محدد"
                      }
                    />
                    <InfoField
                      icon={<LucideCalendar className="h-4 w-4" />}
                      label="تاريخ التسجيل"
                      value={
                        created_at
                          ? format(new Date(created_at), "dd / MM / yyyy")
                          : "غير محدد"
                      }
                    />

                    {/* Signature */}
                    <div className="col-span-full">
                      <InfoField
                        icon={<LucideImage className="h-4 w-4" />}
                        label="التوقيع"
                        value={signature ? "" : "لا يوجد"}
                      />
                      {signature && (
                        <div className="mt-2">
                          <ImageModal
                            src={signature}
                            alt="التوقيع"
                            showThumbnail={false}
                            trigger={<Button size="sm">عرض التوقيع</Button>}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Actions Tab */}
            {canViewDoctorActions && (
              <TabsContent value="actions">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="border-b pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <LucideStethoscope className="h-5 w-5" />
                      إجراءات الطبيب
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Actions doctorId={doctorId!} />
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Working Days Tab */}
            {canViewDoctorWorkingDays && (
              <TabsContent value="working-days">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="border-b pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <LucideCalendar className="h-5 w-5" />
                      أيام العمل
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <WorkingDays doctorId={doctorId!} />
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Clinics Tab */}
            <TabsContent value="clinics">
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <LucideBuilding2 className="h-5 w-5" />
                    العيادات
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {clinics?.map((clinic) => (
                      <div
                        key={clinic.id}
                        className="rounded-lg border p-4 transition-shadow hover:shadow-md"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                            <LucideBuilding2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{clinic.name}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {(!clinics || clinics.length === 0) && (
                    <p className="text-muted-foreground py-8 text-center">
                      لا توجد عيادات لهذا الطبيب
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default DoctorDetails;
