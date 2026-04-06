import { motion } from "framer-motion";
import {
  Wallet,
  BadgeDollarSign,
  Bookmark,
  Users,
  Building2,
} from "lucide-react";
import { MdAttachMoney } from "react-icons/md";
import { FaMoneyBillTransfer, FaUserDoctor } from "react-icons/fa6";
import { TbReportMedical } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi2";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { IWidgets } from "../types";
import { useGetAdminWidgets } from "../queries";
import { itemVariants, containerVariants } from "@/shared/animations";
import { useNavigate } from "react-router";

export const MetricsCards = () => {
  const cards = [
    {
      key: "treasuries_count",
      title: "الخزائن",
      subtitle: "عدد الخزائن",
      icon: Wallet,
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
      gradient: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-500/25",
      path: "/dashboard/treasuries",
    },
    {
      key: "expenses_count",
      title: "المصروفات",
      subtitle: "عدد المصروفات",
      icon: MdAttachMoney,
      color: "text-rose-600",
      bg: "bg-rose-500/10",
      gradient: "from-rose-500 to-red-500",
      shadow: "shadow-rose-500/25",
      path: "/dashboard/expenses",
    },
    {
      key: "transactions_count",
      title: "الإيرادات",
      subtitle: "عدد الإيرادات",
      icon: BadgeDollarSign,
      color: "text-green-600",
      bg: "bg-green-500/10",
      gradient: "from-green-500 to-emerald-500",
      shadow: "shadow-green-500/25",
      path: "/dashboard/transactions",
    },
    {
      key: "transfers_count",
      title: "التحويلات",
      subtitle: "عدد التحويلات",
      icon: FaMoneyBillTransfer,
      color: "text-blue-600",
      bg: "bg-blue-500/10",
      gradient: "from-blue-500 to-indigo-500",
      shadow: "shadow-blue-500/25",
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
      path: "/dashboard/bookings",
    },
    {
      key: "patients_count",
      title: "المرضى",
      subtitle: "إجمالي المرضى",
      icon: Users,
      color: "text-sky-600",
      bg: "bg-sky-500/10",
      gradient: "from-sky-500 to-cyan-500",
      shadow: "shadow-sky-500/25",
      path: "/dashboard/patients",
    },
    {
      key: "employees_count",
      title: "الموظفين",
      subtitle: "عدد الموظفين",
      icon: HiOutlineUsers,
      color: "text-amber-600",
      bg: "bg-amber-500/10",
      gradient: "from-amber-500 to-orange-500",
      shadow: "shadow-amber-500/25",
      path: "/dashboard/employees",
    },
    {
      key: "doctors_count",
      title: "الأطباء",
      subtitle: "عدد الأطباء",
      icon: FaUserDoctor,
      color: "text-cyan-600",
      bg: "bg-cyan-500/10",
      gradient: "from-cyan-500 to-teal-500",
      shadow: "shadow-cyan-500/25",
      path: "/dashboard/doctors",
    },
    {
      key: "clinics_count",
      title: "العيادات",
      subtitle: "عدد العيادات",
      icon: Building2,
      color: "text-indigo-600",
      bg: "bg-indigo-500/10",
      gradient: "from-indigo-500 to-blue-500",
      shadow: "shadow-indigo-500/25",
      path: "/dashboard/clinics",
    },
    {
      key: "prescriptions_count",
      title: "الروشتات",
      subtitle: "عدد الروشتات",
      icon: TbReportMedical,
      color: "text-pink-600",
      bg: "bg-pink-500/10",
      gradient: "from-pink-500 to-rose-500",
      shadow: "shadow-pink-500/25",
      path: "/dashboard/prescriptions",
    },
  ];
  const navigate = useNavigate();

  const { data: metrics, isLoading } = useGetAdminWidgets();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Section Header Skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3"
      >
        <div className="h-1 w-12 rounded-full bg-linear-to-r from-blue-600 to-violet-600"></div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          الإحصائيات العامة
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5"
      >
        {cards.map((card, index) => {
          const value = metrics?.data
            ? metrics.data[card.key as keyof IWidgets] || 0
            : 0;
          return (
            <motion.div
              key={card.key}
              variants={itemVariants}
              custom={index}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Card
                className="group relative cursor-pointer overflow-hidden border-0 bg-white shadow-md ring-1 transition-all duration-300 hover:shadow-2xl dark:bg-gray-900 dark:ring-gray-800 dark:hover:ring-gray-700"
                onClick={() => card.path && navigate(card.path)}
              >
                {/* Top Gradient Line */}
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-1.5 bg-linear-to-r transition-all duration-300",
                    card.gradient
                  )}
                />

                {/* Background Glow Effect */}
                <div
                  className={cn(
                    "absolute -top-6 -right-6 h-24 w-24 rounded-full bg-linear-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20",
                    card.gradient
                  )}
                />

                <CardContent className="relative flex flex-col items-center justify-center space-y-3 p-6 text-center">
                  {/* Icon Container with Gradient */}
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br shadow-lg transition-all duration-300 group-hover:shadow-2xl",
                      card.gradient,
                      card.shadow
                    )}
                  >
                    <card.icon className="h-7 w-7 text-white" />
                  </motion.div>

                  {/* Value */}
                  <div className="space-y-1">
                    <motion.h3
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text font-mono text-3xl font-bold text-transparent dark:from-white dark:to-gray-300"
                    >
                      {new Intl.NumberFormat("en-Us").format(value as number)}
                    </motion.h3>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
                      {card.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {card.subtitle}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
