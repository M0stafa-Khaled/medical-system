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
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800"
          />
        ))}
      </div>
    );
  }

  return (
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
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Card
              className="group relative cursor-pointer overflow-hidden border-0 bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-900"
              onClick={() => card.path && navigate(card.path)}
            >
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

                {/* Value */}
                <div>
                  <h3 className="bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text font-mono text-2xl font-bold text-transparent dark:from-white dark:to-gray-300">
                    {new Intl.NumberFormat("en-Us").format(value as number)}
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
    </motion.div>
  );
};
