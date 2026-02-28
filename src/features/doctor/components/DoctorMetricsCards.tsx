import { motion } from "framer-motion";
import {
  BadgeDollarSign,
  Bookmark,
  Building2,
  CalendarDays,
  Clock,
  Users,
  Stethoscope,
} from "lucide-react";
import { itemVariants, containerVariants } from "@/shared/animations";
import { DoctorWorkingDayCard } from "./DoctorWorkingDayCard";
import { useGetDoctorWidgets } from "@/features/doctor";
import { TbReportMedical } from "react-icons/tb";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { IDoctorWidget } from "@/interfaces/widgets/widgets";

const DoctorMetricsCards = () => {
  const { data: metrics, isLoading } = useGetDoctorWidgets();

  const cards = [
    {
      key: "transactions_total",
      title: "الإيرادات",
      subtitle: "إجمالي المبالغ",
      icon: BadgeDollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
      gradient: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-500/25",
    },
    {
      key: "bookings_count",
      title: "الحجوزات",
      subtitle: "عدد الحجوزات",
      icon: Bookmark,
      color: "text-violet-600",
      bg: "bg-violet-500/10",
      gradient: "from-violet-500 to-purple-500",
      shadow: "shadow-violet-500/25",
    },
    {
      key: "patients_count",
      title: "المرضى",
      subtitle: "إجمالي المرضى",
      icon: Users,
      color: "text-sky-600",
      bg: "bg-sky-500/10",
      gradient: "from-sky-500 to-blue-500",
      shadow: "shadow-sky-500/25",
    },
    {
      key: "clinics_count",
      title: "العيادات",
      subtitle: "عدد العيادات",
      icon: Building2,
      color: "text-amber-600",
      bg: "bg-amber-500/10",
      gradient: "from-amber-500 to-orange-500",
      shadow: "shadow-amber-500/25",
    },
    {
      key: "prescriptions_count",
      title: "الروشتات",
      subtitle: "عدد الروشتات",
      icon: TbReportMedical,
      color: "text-rose-600",
      bg: "bg-rose-500/10",
      gradient: "from-rose-500 to-pink-500",
      shadow: "shadow-rose-500/25",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Metrics Skeleton */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800"
            />
          ))}
        </div>
        {/* Working Days Skeleton */}
        <div className="h-64 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {cards.map((card, index) => {
          const value = metrics?.data
            ? metrics.data[card.key as keyof IDoctorWidget] || 0
            : 0;
          return (
            <motion.div
              key={card.key}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Card className="group relative overflow-hidden border-0 bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-900">
                {/* Top Gradient Line */}
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-1 bg-linear-to-r",
                    card.gradient
                  )}
                />

                <CardContent className="relative flex flex-col items-center justify-center space-y-3 p-5 text-center">
                  {/* Icon Container with Gradient */}
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br shadow-lg transition-shadow duration-300 group-hover:shadow-xl",
                      card.gradient,
                      card.shadow
                    )}
                  >
                    <card.icon className="h-6 w-6 text-white" />
                  </motion.div>

                  <div>
                    <h3 className="bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text font-mono text-2xl font-bold text-transparent dark:from-white dark:to-gray-300">
                      {new Intl.NumberFormat("en-US").format(value as number)}
                    </h3>
                    <p className="mt-0.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {card.title}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {card.subtitle}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        variants={itemVariants}
        key="working_days"
        custom={5}
        className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-lg backdrop-blur-xl transition-all duration-500 dark:border-white/10 dark:bg-gray-900/80 dark:shadow-gray-900/50"
      >
        {/* Top Accent Line */}
        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-violet-500 via-purple-500 to-sky-500" />

        {/* Header */}
        <div className="relative flex flex-row items-center justify-between border-b border-gray-100 p-6 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-sky-500 shadow-lg shadow-violet-500/25 dark:shadow-violet-500/10"
            >
              <Stethoscope className="h-5 w-5 text-white" />
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                أيام العمل
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                جدول مواعيد العيادات الأسبوعي
              </p>
            </div>
          </div>

          {/* Days Count Badge */}
          {metrics && "working_days" in metrics.data && (
            <div className="flex h-9 items-center gap-1.5 rounded-full bg-linear-to-r from-violet-500/10 to-sky-500/10 px-4 text-sm font-semibold text-violet-700 backdrop-blur-sm dark:from-violet-500/20 dark:to-sky-500/20 dark:text-violet-300">
              <CalendarDays className="h-4 w-4" />
              <span>{metrics.data.working_days.length} يوم</span>
            </div>
          )}
        </div>

        {/* Working Days Grid */}
        <div className="relative p-6">
          {metrics &&
          "working_days" in metrics.data &&
          metrics.data.working_days.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {metrics.data.working_days.map((day, index) => (
                <motion.div
                  key={day.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <DoctorWorkingDayCard day={day} />
                </motion.div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-gray-100 to-gray-200 shadow-inner dark:from-gray-800 dark:to-gray-700">
                <Clock className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                لا توجد أيام عمل مسجلة
              </h4>
              <p className="mt-1 max-w-xs text-sm text-gray-500 dark:text-gray-400">
                يمكنك إضافة أيام العمل من إعدادات العيادة لعرضها هنا
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DoctorMetricsCards;
