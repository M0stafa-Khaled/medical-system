import { Link } from "react-router";
import { CalendarClock, CircleDollarSign, Clock3, Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import formatDateTime from "@/shared/utils/formatDate";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { useGetAllPatientBookings } from "@/features/patient/bookings";
import { useGetPatientBalances } from "@/features/patient/balances";
import { OverviewStatCard } from "../components/OverviewStatCard";

const PatientOverview = () => {
  const { data: bookingsRes, isLoading: bookingsLoading } =
    useGetAllPatientBookings({ page: 1 });
  const { data: balancesRes, isLoading: balancesLoading } =
    useGetPatientBalances();

  const bookings = bookingsRes?.data?.items || [];
  const upcomingBookings = bookings
    .filter((item) => item.status === "pending" || item.status === "no-show")
    .slice(0, 5);

  const balances = balancesRes?.data;

  return (
    <section className="space-y-5">
      <Card className="border-0 bg-linear-to-r from-cyan-500/10 via-sky-500/10 to-emerald-500/10">
        <CardHeader className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl sm:text-2xl">مرحبًا بعودتك</CardTitle>
            <p className="text-muted-foreground mt-1 text-sm">
              ابقَ مطلعًا على مواعيدك وحساباتك المالية.
            </p>
          </div>

          <Button asChild className="w-full sm:w-auto">
            <Link
              to="/patient/bookings/create"
              className="inline-flex w-full items-center justify-center sm:w-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              احجز الآن
            </Link>
          </Button>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <OverviewStatCard
          title="الحجوزات القادمة"
          value={String(upcomingBookings.length)}
          hint="المواعيد قيد الانتظار"
          icon={CalendarClock}
          tone="cyan"
        />
        <OverviewStatCard
          title="كل الحجوزات"
          value={String(bookings.length)}
          hint="أحدث صفحة من سجلك"
          icon={Clock3}
          tone="indigo"
        />
        <OverviewStatCard
          title="إجمالي المدفوع"
          value={numberToPrice(balances?.total_amount_paid || 0)}
          hint="المدفوعات المكتملة"
          icon={CircleDollarSign}
          tone="emerald"
        />
        <OverviewStatCard
          title="الرصيد الحالي"
          value={numberToPrice(balances?.total_balance || 0)}
          hint=""
          icon={CircleDollarSign}
          tone="amber"
        />
      </div>

      <Card>
        <CardHeader className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>المواعيد القادمة</CardTitle>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
          >
            <Link
              to="/patient/bookings"
              className="inline-flex w-full items-center justify-center sm:w-auto"
            >
              عرض كل الحجوزات
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {(bookingsLoading || balancesLoading) && (
            <p className="text-muted-foreground text-sm">
              جاري تحميل بيانات اللوحة...
            </p>
          )}

          {!bookingsLoading && upcomingBookings.length === 0 && (
            <p className="text-muted-foreground text-sm">
              لا توجد حجوزات قادمة. يمكنك إنشاء حجز جديد من زر الإجراء.
            </p>
          )}

          {upcomingBookings.length > 0 && (
            <div className="space-y-3">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-muted/40 flex flex-col items-start gap-3 rounded-xl border p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">{booking.doctor.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {booking.clinic.name}
                    </p>
                  </div>
                  <div className="text-muted-foreground text-xs sm:text-sm">
                    {formatDateTime(booking.booking_date)} الساعة{" "}
                    {booking.start_at}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default PatientOverview;
