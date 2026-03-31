import { useEffect } from "react";
import {
  BadgeCheck,
  CalendarDays,
  IdCard,
  LucideIdCard,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import { toast } from "react-toastify";
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
import DataLoader from "@/shared/components/ui/DataLoader";
import formatDateTime from "@/shared/utils/formatDate";
import { useGetUserProfile } from "@/features/profile/queriesAndMutations";
import { UpdatePatientProfile } from "@/features/profile/components/UpdatePatientProfile";
import { ChangePassword } from "@/features/profile/components/ChangePassword";
import { IPatient } from "@/features/dashboard/patients/types";

const PatientProfile = () => {
  const { data, isLoading, isError } = useGetUserProfile();

  useEffect(() => {
    if (isError) {
      toast.error("فشل في تحميل بيانات الملف الشخصي");
    }
  }, [isError]);

  if (isLoading) return <DataLoader />;

  if (!data?.status || !data?.data) {
    return (
      <div className="text-muted-foreground rounded-xl border p-4 text-center">
        تعذر تحميل بيانات الملف الشخصي.
      </div>
    );
  }

  const patient = data.data as IPatient;

  return (
    <section className="space-y-5">
      <Card className="overflow-hidden border-0 bg-linear-to-r from-cyan-500/10 via-sky-500/10 to-indigo-500/10">
        <CardHeader className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl sm:text-2xl">الملف الشخصي</CardTitle>
            <p className="text-muted-foreground mt-1 text-sm">
              راجع بياناتك الشخصية وحدّثها بسهولة من مكان واحد.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <UpdatePatientProfile className="w-full sm:w-auto" />
            <ChangePassword
              compact
              variant="outline"
              className="w-full sm:w-auto"
            />
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-4">
          <CardContent className="flex flex-col items-center py-6">
            <Avatar className="border-background h-28 w-28 border-4 shadow-lg">
              <AvatarImage
                src={patient.personal_image || "/images/avatar.svg"}
                alt={patient.name}
              />
              <AvatarFallback className="text-3xl">
                {patient.name?.charAt(0) || "م"}
              </AvatarFallback>
            </Avatar>

            <h3 className="mt-4 text-xl font-semibold">{patient.name}</h3>
            <p className="text-muted-foreground text-sm">
              {patient.another_name || "-"}
            </p>

            <div className="bg-muted/40 mt-4 flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm">
              <span className="text-muted-foreground">الحالة</span>
              <span className="inline-flex items-center gap-1 font-medium text-emerald-600">
                <BadgeCheck size={14} />
                {patient.user?.active ? "نشط" : "غير نشط"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle>بيانات الحساب</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="bg-muted/30 rounded-lg border p-3">
              <p className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
                <UserRound size={14} />
                الاسم الكامل
              </p>
              <p className="font-medium">{patient.name}</p>
            </div>
            <div className="bg-muted/30 rounded-lg border p-3">
              <p className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
                <UserRound size={14} />
                اسم احد الاقارب
              </p>
              <p className="font-medium">{patient.another_name || "-"}</p>
            </div>

            <div className="bg-muted/30 rounded-lg border p-3">
              <p className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
                <Mail size={14} />
                البريد الإلكتروني
              </p>
              <p className="font-medium">{patient.user?.email || "-"}</p>
            </div>

            <div className="bg-muted/30 rounded-lg border p-3">
              <p className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
                <Phone size={14} />
                الهاتف الأساسي
              </p>
              <p className="font-medium">{patient.first_phone || "-"}</p>
            </div>

            <div className="bg-muted/30 rounded-lg border p-3">
              <p className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
                <Phone size={14} />
                الهاتف الاحتياطي
              </p>
              <p className="font-medium">{patient.second_phone || "-"}</p>
            </div>

            <div className="bg-muted/30 rounded-lg border p-3">
              <p className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
                <IdCard size={14} />
                رقم الهوية
              </p>
              <p className="font-medium">{patient.personal_id || "-"}</p>
            </div>
            <div className="bg-muted/30 rounded-lg border p-3">
              <p className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
                <LucideIdCard size={14} />
                رقم الملف
              </p>
              <p className="font-medium">{patient.file_code || "-"}</p>
            </div>

            <div className="bg-muted/30 rounded-lg border p-3">
              <p className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
                <CalendarDays size={14} />
                تاريخ الانضمام
              </p>
              <p className="font-medium">
                {formatDateTime(patient.created_at)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PatientProfile;
