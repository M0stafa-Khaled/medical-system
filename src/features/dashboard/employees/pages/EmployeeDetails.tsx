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
  LucideBriefcase,
  LucideShield,
  LucidePhone,
  LucideMail,
  LucideIdCard,
  LucideCalendar,
  LucideWallet,
  LucidePen,
  LucideBadgeCheck,
  LucideBadgeX,
  LucideUserCircle,
  LucideImage,
  LucideArrowLeft,
} from "lucide-react";
import ImageModal from "@/shared/components/ImageModal";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import DataLoader from "@/shared/components/ui/DataLoader";
import { Helmet } from "react-helmet-async";
import { AxiosResErr } from "@/shared/types";
import { DeleteAlert } from "@/shared/components/delete-alert";
import { useDeleteEmployee, useGetEmployeeById } from "../queriesAndMutations";
import { EmployeePermissions } from "@/features/profile/components/EmployeePermissions";
import { format } from "date-fns";
import { cn } from "@/shared/lib/utils";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import InfoField from "@/shared/components/InfoField";

const EmployeeDetails = () => {
  const canUpdateEmployee = useHasPermission(PERMISSIONS.UPDATE_EMPLOYEE);
  const canDeleteEmployee = useHasPermission(PERMISSIONS.DELETE_EMPLOYEE);
  const navigate = useNavigate();
  const { employeeId } = useParams();

  const {
    data: employee,
    isLoading,
    isError,
    failureReason,
  } = useGetEmployeeById({
    id: employeeId!,
  });
  const { mutateAsync: deleteEmployee } = useDeleteEmployee();

  const employeeFailure = failureReason as AxiosResErr;

  useEffect(() => {
    if (isError || employeeFailure?.response?.data.message) {
      toast.error(
        employeeFailure.response?.data.message || "فشل في تحميل بيانات الموظف"
      );
      navigate(-1);
      return;
    }
  }, [isError, navigate, employeeFailure]);

  if (isLoading) return <DataLoader />;

  const {
    id,
    first_phone,
    second_phone,
    name,
    image,
    job,
    salary,
    created_at,
    status,
    personal_id,
    user,
    gender,
    personal_image,
    permissions,
    treasury,
  } = employee?.data || {};

  const profileImage = image || "/images/avatar.svg";
  const role = user?.role;

  const getRoleLabel = (r?: string) => {
    switch (r) {
      case "employee":
        return "موظف";
      case "admin":
        return "مسؤول";
      default:
        return "مستخدم";
    }
  };

  const getRoleColor = (r?: string) => {
    switch (r) {
      case "admin":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
      case "employee":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_WEB_NAME} | {name || " "}
        </title>
      </Helmet>

      <Button
        variant="ghost"
        className="mb-4 gap-2"
        onClick={() => navigate(-1)}
      >
        <LucideArrowLeft className="h-4 w-4" />
        رجوع
      </Button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Card className="overflow-hidden border-0 shadow-lg">
            {/* Cover */}
            <div className="h-32 w-full bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500" />

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
                <span
                  className={`mt-2 inline-block rounded-full px-4 py-1 text-sm font-medium ${getRoleColor(role)}`}
                >
                  {getRoleLabel(role)}
                </span>
              </div>

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

              <div className="mt-6 w-full space-y-2">
                {canUpdateEmployee && (
                  <Button variant="outline" className="w-full gap-2" asChild>
                    <Link to={`/dashboard/employees/${id}/update`}>
                      <LucidePen className="h-4 w-4" />
                      تعديل
                    </Link>
                  </Button>
                )}
                {canDeleteEmployee && (
                  <DeleteAlert
                    deleteAction={() => deleteEmployee({ id: id! })}
                    name={name!}
                    navigatePath="/dashboard/employees"
                    className="w-full rounded-md"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8">
          <Tabs defaultValue="info" className="w-full">
            <TabsList
              className={cn(
                "mb-4 grid h-auto w-full gap-2",
                role === "employee" ? "grid-cols-3" : "grid-cols-2"
              )}
            >
              <TabsTrigger value="info" className="gap-2 py-2">
                <LucideUser className="h-4 w-4" />
                <span className="hidden sm:inline">المعلومات</span>
              </TabsTrigger>
              {role === "employee" && (
                <TabsTrigger value="permissions" className="gap-2 py-2">
                  <LucideShield className="h-4 w-4" />
                  <span className="hidden sm:inline">الصلاحيات</span>
                </TabsTrigger>
              )}
              <TabsTrigger value="images" className="gap-2 py-2">
                <LucideImage className="h-4 w-4" />
                <span className="hidden sm:inline">الصور</span>
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
                      icon={<LucideBriefcase className="h-4 w-4" />}
                      label="الوظيفة"
                      value={job || "غير محدد"}
                    />
                    <InfoField
                      icon={<LucideWallet className="h-4 w-4" />}
                      label="الراتب"
                      value={salary ? numberToPrice(salary) : "غير محدد"}
                    />
                    <InfoField
                      icon={<LucideWallet className="h-4 w-4" />}
                      label="الخزينة"
                      value={treasury?.name || "غير محدد"}
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
                        gender?.toLowerCase() === "male"
                          ? "ذكر"
                          : gender?.toLowerCase() === "female"
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
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Permissions Tab (for employees only) */}
            {role === "employee" && (
              <TabsContent value="permissions">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="border-b pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <LucideShield className="h-5 w-5" />
                      صلاحيات الموظف
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <EmployeePermissions permissions={permissions || []} />
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Images Tab */}
            <TabsContent value="images">
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <LucideImage className="h-5 w-5" />
                    الصور
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Profile Image */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-muted-foreground mb-3 text-sm font-medium">
                        الصورة الشخصية
                      </h3>
                      {personal_image ? (
                        <ImageModal
                          src={personal_image}
                          alt={name || "الصورة الشخصية"}
                          showThumbnail={false}
                          trigger={
                            <div className="cursor-pointer overflow-hidden rounded-lg border shadow-md transition-transform hover:scale-105">
                              <img
                                src={personal_image}
                                alt={name || "الصورة الشخصية"}
                                className="h-48 w-auto object-cover"
                              />
                            </div>
                          }
                        />
                      ) : (
                        <div className="bg-muted/50 flex h-48 w-48 items-center justify-center rounded-lg border border-dashed">
                          <p className="text-muted-foreground">لا توجد صورة</p>
                        </div>
                      )}
                    </div>

                    {/* Personal Image */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-muted-foreground mb-3 text-sm font-medium">
                        صورة الهوية
                      </h3>
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
                                className="h-48 w-auto object-cover"
                              />
                            </div>
                          }
                        />
                      ) : (
                        <div className="bg-muted/50 flex h-48 w-48 items-center justify-center rounded-lg border border-dashed">
                          <p className="text-muted-foreground">لا توجد صورة</p>
                        </div>
                      )}
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

export default EmployeeDetails;
