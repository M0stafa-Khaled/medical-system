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
  LucideUserCircle,
  LucideImage,
  LucideBadgeCheck,
  LucideBadgeX,
  LucideUsers,
  LucideInfo,
  LucideArrowLeft,
  LucideFileText,
} from "lucide-react";
import ImageModal from "@/shared/components/ImageModal";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import DataLoader from "@/shared/components/ui/DataLoader";
import { Helmet } from "react-helmet-async";
import { AxiosResErr } from "@/shared/types";
import { useDeletePatient, useGetPatientById } from "../queriesAndMutations";
import { DeleteAlert } from "@/shared/components/delete-alert";
import { PatientBalances } from "../balances/components/PatientBalances";
import { format } from "date-fns";
import { cn } from "@/shared/lib/utils";
import InfoField from "@/shared/components/InfoField";

const PatientDetails = () => {
  const canUpdatePatient = useHasPermission(PERMISSIONS.UPDATE_PATIENT);
  const canDeletePatient = useHasPermission(PERMISSIONS.DELETE_PATIENT);
  const canViewPatientBalances = useHasPermission(PERMISSIONS.PATIENT_BALANCES);

  const navigate = useNavigate();
  const { patientId } = useParams();

  const {
    data: patient,
    isLoading,
    isError,
    failureReason,
  } = useGetPatientById({
    id: patientId!,
  });

  const patientFailure = failureReason as AxiosResErr;

  useEffect(() => {
    if (isError || patientFailure?.response?.data.message) {
      toast.error(
        patientFailure.response?.data.message || "فشل في تحميل بيانات المريض"
      );
      navigate(-1);
      return;
    }
  }, [isError, navigate, patientFailure]);

  const { mutateAsync: deletePatient } = useDeletePatient();

  if (isLoading) return <DataLoader />;

  const {
    id,
    first_phone,
    second_phone,
    name,
    created_at,
    status,
    personal_id,
    user,
    gender,
    personal_image,
    another_name,
    info_status,
    description,
    file_code,
  } = patient?.data || {};

  const profileImage = personal_image || "/images/avatar.svg";

  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_WEB_NAME} | {name || " "}
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
            <div className="h-32 w-full bg-linear-to-br from-orange-500 via-amber-500 to-yellow-500" />

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
                        {name?.charAt(0) || "?"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>

              {/* Name & Role */}
              <div className="mt-4 text-center">
                <h1 className="text-2xl font-bold">{name}</h1>
                <span className="mt-2 inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                  مريض
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
                {canUpdatePatient && (
                  <Button variant="outline" className="w-full gap-2" asChild>
                    <Link to={`/dashboard/patients/${id}/update`}>
                      <LucidePen className="h-4 w-4" />
                      تعديل
                    </Link>
                  </Button>
                )}
                {canDeletePatient && (
                  <DeleteAlert
                    deleteAction={() => deletePatient({ id: id! })}
                    name={name!}
                    navigatePath="/dashboard/patients"
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
                "mb-4 grid w-full gap-2",
                canViewPatientBalances ? "grid-cols-3" : "grid-cols-2"
              )}
            >
              <TabsTrigger value="info" className="gap-2">
                <LucideUser className="h-4 w-4" />
                <span className="hidden sm:inline">المعلومات</span>
              </TabsTrigger>
              <TabsTrigger value="image" className="gap-2">
                <LucideImage className="h-4 w-4" />
                <span className="hidden sm:inline">الصورة</span>
              </TabsTrigger>
              {canViewPatientBalances && (
                <TabsTrigger value="balances" className="gap-2">
                  <LucideFileText className="h-4 w-4" />
                  <span className="hidden sm:inline">كشف حساب</span>
                </TabsTrigger>
              )}
            </TabsList>

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
                      icon={<LucideUsers className="h-4 w-4" />}
                      label="اسم احد الاقارب"
                      value={another_name || "غير محدد"}
                    />
                    <InfoField
                      icon={<LucideIdCard className="h-4 w-4" />}
                      label="رقم الملف"
                      value={file_code || "غير محدد"}
                    />
                    <InfoField
                      icon={<LucideInfo className="h-4 w-4" />}
                      label="ملاحظات حالة الحساب"
                      value={info_status || "غير محدد"}
                    />
                    <InfoField
                      icon={<LucideIdCard className="h-4 w-4" />}
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
                      value={second_phone || "غير محدد"}
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
                    <div className="col-span-full">
                      <InfoField
                        icon={<LucideInfo className="h-4 w-4" />}
                        label="ملاحظات"
                        value={description || "لا توجد ملاحظات"}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Image Tab */}
            <TabsContent value="image">
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <LucideImage className="h-5 w-5" />
                    صورة الهوية
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center pt-6">
                  {personal_image ? (
                    <ImageModal
                      src={personal_image}
                      alt="صورة الهوية"
                      showThumbnail={false}
                      trigger={
                        <div className="cursor-pointer overflow-hidden rounded-lg border shadow-md transition-transform hover:scale-105">
                          <img
                            src={personal_image}
                            alt="صورة الهوية"
                            className="h-auto max-h-96 w-auto object-contain"
                          />
                        </div>
                      }
                    />
                  ) : (
                    <div className="bg-muted/50 flex h-64 w-full items-center justify-center rounded-lg border border-dashed">
                      <p className="text-muted-foreground">لا توجد صورة</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Balances Tab */}
            {canViewPatientBalances && (
              <TabsContent value="balances">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="border-b pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <LucideFileText className="h-5 w-5" />
                      كشف حساب المريض
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <PatientBalances patientId={patientId!} />
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default PatientDetails;
