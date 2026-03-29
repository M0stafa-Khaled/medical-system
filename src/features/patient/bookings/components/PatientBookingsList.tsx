import {
  Eye,
  Building2,
  CalendarDays,
  Clock3,
  Stethoscope,
  Ticket,
} from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import DataTablePagination from "@/shared/components/ui/DataTablePagination";
import { convertDayFromEnToAr } from "@/shared/utils/convertDayLang";
import formatDateTime from "@/shared/utils/formatDate";
import { IPatientBooking } from "../types";

type BookingActionHandlers = {
  onCancel: (id: string) => void;
  isCancelling?: boolean;
};

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

export const PatientBookingsList = ({
  data,
  isLoading,
  meta,
  currentPage,
  onCancel,
  isCancelling,
}: {
  data: IPatientBooking[];
  isLoading: boolean;
  currentPage: number;
  meta?: {
    from: number;
    per_page: number;
    last_page: number;
    to: number;
    total: number;
  };
} & BookingActionHandlers) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="bg-muted h-4 w-1/3 animate-pulse rounded" />
              <div className="bg-muted h-5 w-2/3 animate-pulse rounded" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted h-4 w-full animate-pulse rounded" />
              <div className="bg-muted h-4 w-5/6 animate-pulse rounded" />
              <div className="bg-muted h-9 w-full animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!data.length) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-10 text-center">
          <p className="text-muted-foreground text-sm">
            لا توجد حجوزات حالياً.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {data.map((booking) => (
          <Card key={booking.id} className="border-border/70 overflow-hidden">
            <CardHeader className="bg-muted/30 pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">حجز رقم</p>
                  <CardTitle className="text-base">
                    <span className="inline-flex items-center gap-2">
                      <Ticket className="h-4 w-4" />#{booking.code}
                    </span>
                  </CardTitle>
                </div>

                <Badge
                  className={statusClasses[booking.status] || ""}
                  variant="secondary"
                >
                  {statusLabel[booking.status] || booking.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                  <p className="text-muted-foreground mb-1 text-xs">
                    اليوم والتاريخ
                  </p>
                  <p className="flex items-center gap-2 text-sm font-medium">
                    <CalendarDays className="h-4 w-4" />
                    {convertDayFromEnToAr(booking.day)} -{" "}
                    {formatDateTime(booking.booking_date)}
                  </p>
                </div>

                <div className="bg-muted/40 rounded-lg border p-3">
                  <p className="text-muted-foreground mb-1 text-xs">
                    الوقت والخدمة
                  </p>
                  <p className="flex items-center gap-2 text-sm font-medium">
                    <Clock3 className="h-4 w-4" />
                    {booking.start_at} - {booking.action.name}
                  </p>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button asChild className="w-full sm:w-auto">
                  <Link to={`/patient/bookings/${booking.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    التفاصيل
                  </Link>
                </Button>

                {booking.status !== "cancelled" && (
                  <Button
                    variant="destructive"
                    disabled={isCancelling}
                    onClick={() => onCancel(booking.id.toString())}
                    className="w-full sm:w-auto"
                  >
                    إلغاء الحجز
                  </Button>
                )}

                {booking.status !== "collected" &&
                  booking.status !== "completed" && (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      <Link to={`/patient/bookings/${booking.id}/edit`}>
                        تعديل الحجز
                      </Link>
                    </Button>
                  )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(meta?.last_page || 0) > 1 && (
        <DataTablePagination
          currentPage={currentPage}
          totalPages={meta?.last_page || 1}
        />
      )}
    </div>
  );
};
