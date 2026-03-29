import DataLoader from "@/shared/components/ui/DataLoader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import formatDateTime from "@/shared/utils/formatDate";
import { convertDayFromEnToAr } from "@/shared/utils/convertDayLang";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  CalendarDays,
  Clock3,
  Stethoscope,
  Ticket,
  User,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { Helmet } from "react-helmet-async";
import { useGetPatientBookingById } from "../queriesAndMutations";

const statusClasses: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-600",
  cancelled: "bg-rose-500/15 text-rose-600",
  collected: "bg-sky-500/15 text-sky-600",
  completed: "bg-emerald-500/15 text-emerald-600",
  ended: "bg-indigo-500/15 text-indigo-600",
  "no-show": "bg-zinc-500/15 text-zinc-600",
};

const statusLabel: Record<string, string> = {
  pending: "قيد الانتظار",
  cancelled: "ملغي",
  collected: "تم التحصيل",
  completed: "مكتمل",
  ended: "منتهي",
  "no-show": "لم يحضر",
};

const PatientBookingDetails = () => {
  const navigate = useNavigate();
  const { bookingId = "" } = useParams();

  const { data, isLoading, isError } = useGetPatientBookingById({
    id: bookingId,
  });

  if (isLoading) return <DataLoader />;

  if (isError || !data?.data) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" className="gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
          رجوع
        </Button>
        <div className="text-muted-foreground flex items-center gap-2 rounded-xl border p-4">
          <AlertTriangle size={18} />
          تعذر تحميل تفاصيل الحجز.
        </div>
      </div>
    );
  }

  const booking = data.data;

  return (
    <section className="space-y-5">
      <Helmet>
        <title>
          {import.meta.env.VITE_WEB_NAME} | تفاصيل الحجز #{booking.code}
        </title>
      </Helmet>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="ghost" className="gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
          رجوع
        </Button>

        {booking.status !== "collected" && booking.status !== "completed" && (
          <Button asChild variant="outline">
            <Link to={`/patient/bookings/${booking.id}/edit`}>تعديل الحجز</Link>
          </Button>
        )}
      </div>

      <Card className="border-border/70 overflow-hidden">
        <CardHeader className="bg-muted/30">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="inline-flex items-center gap-2 text-xl">
              <Ticket className="h-5 w-5" />
              تفاصيل الحجز #{booking.code}
            </CardTitle>

            <Badge
              className={statusClasses[booking.status] || ""}
              variant="secondary"
            >
              {statusLabel[booking.status] || booking.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-3 p-5 md:grid-cols-2">
          <div className="bg-muted/40 rounded-lg border p-3">
            <p className="text-muted-foreground mb-1 text-xs">المريض</p>
            <p className="flex items-center gap-2 text-sm font-medium">
              <User className="h-4 w-4" />
              {booking.patient.name}
            </p>
          </div>

          <div className="bg-muted/40 rounded-lg border p-3">
            <p className="text-muted-foreground mb-1 text-xs">الطبيب</p>
            <p className="flex items-center gap-2 text-sm font-medium">
              <Stethoscope className="h-4 w-4" />
              {booking.doctor.name}
            </p>
          </div>

          <div className="bg-muted/40 rounded-lg border p-3">
            <p className="text-muted-foreground mb-1 text-xs">العيادة</p>
            <p className="flex items-center gap-2 text-sm font-medium">
              <Building2 className="h-4 w-4" />
              {booking.clinic.name}
            </p>
          </div>

          <div className="bg-muted/40 rounded-lg border p-3">
            <p className="text-muted-foreground mb-1 text-xs">الخدمة</p>
            <p className="text-sm font-medium">{booking.action.name}</p>
          </div>

          <div className="bg-muted/40 rounded-lg border p-3">
            <p className="text-muted-foreground mb-1 text-xs">اليوم والتاريخ</p>
            <p className="flex items-center gap-2 text-sm font-medium">
              <CalendarDays className="h-4 w-4" />
              {convertDayFromEnToAr(booking.day)} -{" "}
              {formatDateTime(booking.booking_date)}
            </p>
          </div>

          <div className="bg-muted/40 rounded-lg border p-3">
            <p className="text-muted-foreground mb-1 text-xs">وقت الدخول</p>
            <p className="flex items-center gap-2 text-sm font-medium">
              <Clock3 className="h-4 w-4" />
              {booking.start_at}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PatientBookingDetails;
