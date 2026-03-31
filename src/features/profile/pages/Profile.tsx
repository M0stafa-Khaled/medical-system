import DataLoader from "@/shared/components/ui/DataLoader";
import { IPatient } from "@/features/dashboard/patients/types";
import { format } from "date-fns";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { TRole } from "@/shared/types";
import {
  useGetUserProfile,
  useUpdateProfile,
} from "@/features/profile/queriesAndMutations";
import { IEmployee } from "@/features/dashboard/employees/types";
import { EmployeePermissions } from "../components/EmployeePermissions";
import { DoctorClinics } from "../components/DoctorClinics";
import { IDoctor } from "@/features/dashboard/doctors/types";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  LucideCamera,
  LucideLock,
  LucideUser,
  LucideStethoscope,
  LucideShield,
  LucideMail,
  LucidePhone,
  LucideIdCard,
  LucideCalendar,
  LucideWallet,
  LucideBriefcase,
} from "lucide-react";
import { ChangePassword } from "../components/ChangePassword";
import { UpdateDoctorProfile } from "../components/UpdateDoctorProfile";
import { UpdatePatientProfile } from "../components/UpdatePatientProfile";
import { handleResErr } from "@/shared/utils/handleResError";
import Navbar from "@/shared/components/navigation/navbar/Navbar";
import { cn } from "@/shared/lib/utils";
import InfoField from "@/shared/components/InfoField";
import { numberToPrice } from "@/shared/utils/numberToPrice";

const Profile = () => {
  const navigate = useNavigate();
  const { data: userData, isLoading, isError, refetch } = useGetUserProfile();
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error("فشل في تحميل بيانات الملف الشخصى");
      navigate("/dashboard/employees");
      return;
    }

    if (userData && !userData.status && userData.message) {
      toast.error(userData.message);
      navigate("/dashboard/employees");
      return;
    }
  }, [userData, isError, navigate]);

  const handleImageUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const role = userData?.data?.user?.role;
      let updateData: Record<string, unknown> = {};

      if (role === "doctor") {
        updateData = { image: file };
      } else if (role === "patient") {
        updateData = { personal_image: file };
      } else if (role === "employee" || role === "admin") {
        updateData = { image: file };
      }

      const result = await updateProfile({
        role: role as TRole,
        dataForm: updateData,
      });

      if (!result.status) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      refetch();
    } catch (error) {
      handleResErr(error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <DataLoader />
      </div>
    );

  const user = userData?.data?.user;
  const role = user?.role;

  let patientData: Partial<IPatient> = {};
  let doctorData: Partial<IDoctor> = {};
  let employeeData: Partial<IEmployee> = {};

  if (role === "patient") {
    const data = userData?.data as IPatient | undefined;
    patientData = {
      another_name: data?.another_name,
      personal_image: data?.personal_image,
    };
  } else if (role === "doctor") {
    const data = userData?.data as IDoctor | undefined;
    doctorData = {
      commission: data?.commission,
      signature: data?.signature,
      register_id: data?.register_id,
      clinics: data?.clinics,
      image: data?.image,
    };
  } else {
    const data = userData?.data as IEmployee | undefined;
    employeeData = {
      job: data?.job,
      salary: data?.salary,
      permissions: data?.permissions,
      treasury: data?.treasury,
      image: data?.image,
    };
  }

  const profileImage =
    role === "admin" || role === "employee"
      ? employeeData.image
      : role === "doctor"
        ? doctorData.image
        : role === "patient"
          ? patientData.personal_image
          : "/images/avatar.svg";

  const getRoleLabel = (r?: string) => {
    switch (r) {
      case "employee":
        return "موظف";
      case "admin":
        return "مسؤول";
      case "doctor":
        return "طبيب";
      case "patient":
        return "مريض";
      default:
        return "مستخدم";
    }
  };

  const getRoleColor = (r?: string) => {
    switch (r) {
      case "admin":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
      case "doctor":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "employee":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "patient":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Calculate number of tabs for responsive grid
  const getTabsCount = () => {
    let count = 2; // info + password always shown
    if (role === "doctor") count++;
    if (role === "admin" || role === "employee") count++;
    if (role === "employee") count++;
    return count;
  };

  const tabsCount = getTabsCount();

  const getTabsGridClass = () => {
    switch (tabsCount) {
      case 4:
        return "grid-cols-4";
      case 3:
        return "grid-cols-3";
      case 2:
        return "grid-cols-2";
      default:
        return "grid-cols-1";
    }
  };

  const name = userData?.data.name;
  const first_phone = userData?.data.first_phone;
  const second_phone = userData?.data.second_phone;
  const personal_id = userData?.data.personal_id;
  const gender = userData?.data.gender;
  const created_at = userData?.data.created_at;

  return (
    <>
      <div className="container">
        <Navbar
          links={[
            ...(role === "admin" || role === "employee"
              ? [{ name: "لوحة التحكم", path: "/dashboard" }]
              : []),

            ...(role === "doctor"
              ? [{ name: "لوحة التحكم", path: "/doctor" }]
              : []),
            ...(role === "patient"
              ? [{ name: "الحجوزات", path: "/bookings" }]
              : []),
          ]}
        />
      </div>
      <div className="container mx-auto mt-10 max-w-6xl py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Right Sidebar - Profile Card */}
          <div className="lg:col-span-4">
            <Card className="overflow-hidden border-0 shadow-lg">
              {/* Cover */}
              <div className="h-32 w-full bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500" />

              <CardContent className="flex flex-col items-center px-6 pb-6">
                <div className="-mt-16">
                  <div className="relative">
                    <div className="border-background bg-background h-32 w-32 overflow-hidden rounded-full border-4 shadow-xl">
                      <Avatar className="h-full w-full">
                        <AvatarImage
                          src={profileImage || "/images/avatar.svg"}
                          alt={name}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-3xl">
                          {name?.charAt(0) || "?"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <label
                      htmlFor="profile-image-upload"
                      className="bg-primary text-primary-foreground absolute right-1 bottom-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
                    >
                      {isUploading ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        <LucideCamera className="h-5 w-5" />
                      )}
                      <input
                        ref={fileInputRef}
                        id="profile-image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpdate}
                        disabled={isUploading}
                      />
                    </label>
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

                {/* Quick Actions */}
                <div className="mt-6 flex w-full flex-col justify-center space-y-2">
                  {role === "doctor" && (
                    <UpdateDoctorProfile className="w-full gap-2" />
                  )}
                  {role === "patient" && (
                    <UpdatePatientProfile className="w-full gap-2" />
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
                  `mb-4 grid h-auto w-full gap-2`,
                  getTabsGridClass()
                )}
              >
                <TabsTrigger value="info" className="gap-2 py-2.5">
                  <LucideUser className="h-4 w-4" />
                  <span className="hidden sm:inline">المعلومات</span>
                </TabsTrigger>
                <TabsTrigger value="password" className="gap-2 py-2.5">
                  <LucideLock className="h-4 w-4" />
                  <span className="hidden sm:inline">كلمة المرور</span>
                </TabsTrigger>
                {(role === "admin" || role === "employee") && (
                  <TabsTrigger value="treasury" className="gap-2 py-2.5">
                    <LucideWallet className="h-4 w-4" />
                    <span className="hidden sm:inline">الخزنة</span>
                  </TabsTrigger>
                )}
                {role === "doctor" && (
                  <TabsTrigger value="clinics" className="gap-2 py-2.5">
                    <LucideStethoscope className="h-4 w-4" />
                    <span className="hidden sm:inline">العيادات</span>
                  </TabsTrigger>
                )}
                {role === "employee" && (
                  <TabsTrigger value="permissions" className="gap-2 py-2.5">
                    <LucideShield className="h-4 w-4" />
                    <span className="hidden sm:inline">الصلاحيات</span>
                  </TabsTrigger>
                )}
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
                      {/* Patient Info */}
                      {role === "patient" && (
                        <InfoField
                          icon={<LucideIdCard className="h-4 w-4" />}
                          label="اسم احد الاقارب"
                          value={patientData.another_name || "غير محدد"}
                        />
                      )}

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
                        icon={<LucideIdCard className="h-4 w-4" />}
                        label={role === "patient" ? "رقم الملف" : "رقم الهوية"}
                        value={personal_id || "غير محدد"}
                      />
                      <InfoField
                        icon={<LucideUser className="h-4 w-4" />}
                        label="الجنس"
                        value={
                          gender === "Male"
                            ? "ذكر"
                            : gender === "Female"
                              ? "انثى"
                              : "غير محدد"
                        }
                      />

                      {/* Employee Info */}
                      {(role === "admin" || role === "employee") && (
                        <>
                          <InfoField
                            icon={<LucideBriefcase className="h-4 w-4" />}
                            label="الوظيفة"
                            value={employeeData.job || "غير محدد"}
                          />
                          <InfoField
                            icon={<LucideWallet className="h-4 w-4" />}
                            label="الراتب"
                            value={
                              employeeData.salary
                                ? numberToPrice(employeeData.salary)
                                : "غير محدد"
                            }
                          />
                          <InfoField
                            icon={<LucideWallet className="h-4 w-4" />}
                            label="الخزنة"
                            value={employeeData.treasury?.name || "غير محدد"}
                          />
                        </>
                      )}

                      {/* Doctor Info */}
                      {role === "doctor" && (
                        <>
                          <InfoField
                            icon={<LucideIdCard className="h-4 w-4" />}
                            label="رقم القيد"
                            value={doctorData.register_id || "غير محدد"}
                          />
                          <InfoField
                            icon={<LucideWallet className="h-4 w-4" />}
                            label="العمولة"
                            value={
                              doctorData.commission
                                ? `${doctorData.commission}%`
                                : "غير محدد"
                            }
                          />
                        </>
                      )}

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

              {/* Password Tab */}
              <TabsContent value="password">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="border-b pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <LucideLock className="h-5 w-5" />
                      تغيير كلمة المرور
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ChangePassword fullPage />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Treasury Tab */}
              {(role === "admin" || role === "employee") && (
                <TabsContent value="treasury">
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="border-b pb-4">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <LucideWallet className="h-5 w-5" />
                        خزنة المستخدم
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {employeeData.treasury ? (
                        <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                          <InfoField
                            icon={<LucideWallet className="h-4 w-4" />}
                            label="اسم الخزنة"
                            value={employeeData.treasury.name}
                          />
                          <InfoField
                            icon={<LucideShield className="h-4 w-4" />}
                            label="الحالة"
                            value={
                              employeeData.treasury.status
                                ? "مفعلة"
                                : "غير مفعلة"
                            }
                          />
                          <InfoField
                            icon={<LucideWallet className="h-4 w-4" />}
                            label="إجمالي المبلغ"
                            value={numberToPrice(employeeData.treasury.total)}
                          />
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-sm">
                          لا يوجد خزنة مضافة لهذا المستخدم.
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Doctor Clinics Tab */}
              {role === "doctor" && (
                <TabsContent value="clinics">
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="border-b pb-4">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <LucideStethoscope className="h-5 w-5" />
                        عيادات الطبيب
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <DoctorClinics clinics={doctorData?.clinics || []} />
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Employee Permissions Tab */}
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
                      <EmployeePermissions
                        permissions={employeeData.permissions || []}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
