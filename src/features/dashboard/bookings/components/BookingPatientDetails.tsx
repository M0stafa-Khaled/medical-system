import { IPatient } from "@/features/dashboard/patients/types";
import InfoField from "@/shared/components/InfoField";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import {
  AlertCircle,
  BadgeCheck,
  BadgeX,
  FileText,
  Loader2,
  Phone,
  User,
  Users,
} from "lucide-react";
import { Link } from "react-router";

const BookingPatientDetails = ({
  patient,
  patientId,
  isPatientLoading,
}: {
  patient?: IPatient;
  patientId?: string;
  isPatientLoading: boolean;
}) => {
  const patientStatusNote = patient?.info_status?.trim() || "";
  const hasPatientAlert = Boolean(
    patient && (!patient.status || patientStatusNote)
  );

  const patientStateBadge =
    patient && patient.status
      ? {
          label: "متاح للحجز",
          variant: "default" as const,
          icon: <BadgeCheck className="h-3.5 w-3.5" />,
          className: "bg-emerald-600 text-white hover:bg-emerald-600",
        }
      : {
          label: "غير متاح للحجز",
          variant: "destructive" as const,
          icon: <BadgeX className="h-3.5 w-3.5" />,
          className: "",
        };

  return (
    <Card className="border-muted/70 sticky top-6 overflow-hidden shadow-lg">
      <CardHeader className="from-background to-muted/30 border-b bg-linear-to-br pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-5 w-5" />
          بيانات المريض
        </CardTitle>
        <CardDescription>
          يتم تحديث هذه البطاقة تلقائيا عند اختيار مريض من الحقل.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 p-3 pt-6 md:p-6">
        {!patientId ? (
          <div className="border-muted-foreground/25 bg-muted/30 text-muted-foreground rounded-xl border border-dashed p-5 text-sm">
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 h-5 w-5 shrink-0" />
              <div className="space-y-2">
                <p className="text-foreground font-medium">
                  اختر مريضا لعرض معلوماته هنا.
                </p>
                <p className="leading-6">
                  ستظهر حالة الحساب، ملاحظات الملف، وبيانات الاتصال حتى يفهم
                  المستخدم سبب عدم التفعيل أو أي تنبيه مرتبط بالحساب.
                </p>
              </div>
            </div>
          </div>
        ) : isPatientLoading ? (
          <div className="border-muted/60 bg-muted/20 text-muted-foreground flex items-center gap-3 rounded-xl border p-5 text-sm">
            <Loader2 className="h-5 w-5 animate-spin" />
            جارٍ تحميل بيانات المريض...
          </div>
        ) : patient ? (
          <>
            {hasPatientAlert && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <div className="space-y-2">
                    <p className="font-semibold">تنبيه على حالة الحساب</p>
                    <p className="text-sm leading-6">
                      هذا المريض غير جاهز بالكامل للحجز حسب البيانات المسجلة.
                      راجع حالة الحساب والملاحظات أدناه لفهم السبب قبل إكمال
                      العملية.
                    </p>
                    <div className="space-y-1 text-sm leading-6">
                      {!patient.status && (
                        <p>- حالة الحساب نفسها غير متاح للحجز.</p>
                      )}
                      {!patient.user.active && (
                        <p>- حساب المستخدم غير مفعل حاليا.</p>
                      )}
                      {patientStatusNote && <p>- {patientStatusNote}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-card flex items-center gap-3 rounded-2xl border p-4 shadow-sm">
              <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
                <User className="h-7 w-7" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-lg font-semibold">
                  <Link
                    to={`/dashboard/patients/${patient?.id}`}
                    className="hover:underline"
                    target="_blank"
                  >
                    {patient?.name}
                  </Link>
                </h3>
                <Badge
                  variant={patientStateBadge.variant}
                  className={`gap-1 ${patientStateBadge.className}`}
                >
                  {patientStateBadge.icon}
                  {patientStateBadge.label}
                </Badge>
                <p className="text-muted-foreground text-sm">
                  رقم الملف: {patient?.personal_id || "غير محدد"}
                </p>
              </div>
            </div>

            <div className="bg-muted/20 grid gap-3 rounded-2xl border p-4">
              <InfoField
                icon={<User className="h-4 w-4" />}
                label="اسم احد الاقارب"
                value={patient?.another_name || "غير محدد"}
                sm
                breakAll
              />
              <InfoField
                icon={<Phone className="h-4 w-4" />}
                label="رقم الهاتف"
                value={patient?.first_phone || "غير محدد"}
                sm
                breakAll
              />
              <InfoField
                icon={<Phone className="h-4 w-4" />}
                label="رقم الهاتف الآخر"
                value={patient?.second_phone || "غير محدد"}
                sm
                breakAll
              />
              <InfoField
                icon={<FileText className="h-4 w-4" />}
                label="ملاحظات"
                value={patient.description || "لا توجد ملاحظات"}
                sm
              />
              <InfoField
                icon={<FileText className="h-4 w-4" />}
                label="ملاحظات الحساب"
                value={patientStatusNote || "لا توجد ملاحظات"}
                sm
              />
            </div>

            <Separator />

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="bg-background rounded-xl border p-4">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  حالة الحساب
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {patientStateBadge.label}
                </p>
              </div>
              <div className="bg-background rounded-xl border p-4">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  تفعيل الحساب
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {patient?.user?.active ? "مفعل" : "غير مفعل"}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="border-muted-foreground/25 bg-muted/30 text-muted-foreground rounded-xl border border-dashed p-5 text-sm">
            تعذر تحميل بيانات المريض المحدد.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingPatientDetails;
