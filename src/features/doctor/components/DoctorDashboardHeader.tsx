import { Activity, Stethoscope } from "lucide-react";

export const DoctorDashboardHeader = () => {
  return (
    <div className="from-primary relative overflow-hidden rounded-2xl bg-linear-to-br via-sky-600 to-emerald-700 p-6 shadow-xl shadow-sky-500/20 sm:p-8 dark:shadow-sky-500/10">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      <div className="absolute top-1/2 right-6 hidden -translate-y-1/2 opacity-20 sm:block">
        <Stethoscope className="h-24 w-24 text-white" strokeWidth={1} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-medium text-sky-100">نظرة عامة</span>
        </div>

        <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
          لوحة تحكم الطبيب
        </h1>

        <p className="mt-2 max-w-xl text-sky-100/90">
          مرحباً بك في لوحة التحكم الخاصة بك. يمكنك هنا متابعة إحصائيات
          الحجوزات، الوصفات الطبية، والأدوية. كما يمكنك إدارة عياداتك ومتابعة
          أدائك اليومي.
        </p>
      </div>
    </div>
  );
};
