import { Link, NavLink, Outlet, ScrollRestoration } from "react-router";
import {
  CalendarCheck2,
  LayoutDashboard,
  Settings,
  UserRound,
  WalletCards,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
// import { NotificationsMenu } from "@/features/notifications";
import ToggleTheme from "@/shared/components/ToggleTheme";
import { LogoutButton } from "@/features/auth";

const navItems = [
  {
    label: "لوحة المريض",
    path: "/patient",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "الحجوزات",
    path: "/patient/bookings",
    icon: CalendarCheck2,
  },
  {
    label: "المدفوعات",
    path: "/patient/balances",
    icon: WalletCards,
  },
  {
    label: "الملف الشخصي",
    path: "/patient/profile",
    icon: Settings,
  },
];

const PatientLayout = () => {
  return (
    <div className="bg-background min-h-screen">
      <ScrollRestoration
        getKey={(location) => {
          if (location.pathname === "/patient") {
            return location.pathname;
          }

          return location.key;
        }}
      />

      <div className="from-primary/10 via-background to-secondary/10 border-b bg-linear-to-r">
        <div className="container py-6 sm:py-8">
          <p className="text-muted-foreground text-sm">بوابة المريض</p>
          <h1 className="mt-2 text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
            لوحة متابعة حالتك الصحية
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
            تابع حجوزاتك، راقب حساباتك المالية، وأدر رحلتك العلاجية من مكان
            واحد.
          </p>
        </div>
      </div>

      <div className="container py-6">
        <div className="mb-4 flex flex-col items-start gap-3 rounded-2xl border p-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-base font-semibold">الإجراءات السريعة</h2>
            <p className="text-muted-foreground text-sm">
              ادخل إلى ملفك الشخصي، تابع الإشعارات، وتحكم في وضع العرض.
            </p>
          </div>

          <div className="bg-muted/40 flex w-full flex-wrap items-center gap-2 rounded-xl p-2 lg:w-auto">
            <Button
              asChild
              variant="outline"
              className="bg-background h-10 w-full rounded-lg border-none shadow-none sm:w-auto"
            >
              <Link
                to="/patient/profile"
                className="inline-flex w-full items-center justify-center gap-2 sm:w-auto"
              >
                <UserRound size={16} />
                الملف الشخصي
              </Link>
            </Button>

            <div className="flex w-full justify-between gap-2 sm:w-fit">
              {/* <NotificationsMenu className="bg-background text-foreground h-10 w-1/2 rounded-lg border-none shadow-none sm:w-10" /> */}
              <ToggleTheme className="bg-background text-foreground h-10 w-full rounded-full border-none shadow-none sm:w-10" />
            </div>
            <LogoutButton
              icon={false}
              className="bg-background text-destructive hover:bg-destructive/10 h-10 w-full justify-center gap-2 rounded-lg border-none shadow-none sm:w-auto sm:px-4"
            />
          </div>
        </div>

        <div className="bg-card mb-6 grid grid-cols-1 gap-2 rounded-2xl border p-2 shadow-sm sm:grid-cols-2 xl:grid-cols-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                <Icon size={16} />
                {item.label}
              </NavLink>
            );
          })}
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default PatientLayout;
