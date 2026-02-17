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

export const MetricsCards = () => {
  const cards = [
    {
      key: "treasuries_count",
      title: "الخزائن",
      icon: Wallet,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "hover:border-emerald-500/50",
    },
    {
      key: "expenses_count",
      title: "المصروفات",
      icon: MdAttachMoney,
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "hover:border-red-500/50",
    },
    {
      key: "transactions_count",
      title: "الايرادات",
      icon: BadgeDollarSign,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "hover:border-green-500/50",
    },
    {
      key: "transfers_count",
      title: "التحويلات",
      icon: FaMoneyBillTransfer,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "hover:border-blue-500/50",
    },
    {
      key: "bookings_count",
      title: "الحجوزات",
      icon: Bookmark,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "hover:border-purple-500/50",
    },
    {
      key: "patients_count",
      title: "المرضى",
      path: "/dashboard/patients",
      icon: Users,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      border: "hover:border-indigo-500/50",
    },
    {
      key: "employees_count",
      title: "الموظفين",
      icon: HiOutlineUsers,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "hover:border-orange-500/50",
    },
    {
      key: "doctors_count",
      title: "الأطباء",
      icon: FaUserDoctor,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
      border: "hover:border-cyan-500/50",
    },
    {
      key: "clinics_count",
      title: "العيادات",
      icon: Building2,
      color: "text-teal-500",
      bg: "bg-teal-500/10",
      border: "hover:border-teal-500/50",
    },
    {
      key: "prescriptions_count",
      title: "الروشتات",
      icon: TbReportMedical,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      border: "hover:border-pink-500/50",
    },
  ];

  const { data: metrics, isLoading } = useGetAdminWidgets();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {cards.map((card) => {
        const value = metrics?.data
          ? metrics.data[card.key as keyof IWidgets] || 0
          : 0;
        return (
          <Card
            key={card.key}
            className={cn(
              "group dark:bg-card transform cursor-pointer border-transparent bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
              card.border
            )}
          >
            <CardContent className="flex flex-col items-center justify-center space-y-3 p-4 text-center">
              <div
                className={cn(
                  "rounded-full p-3 transition-transform duration-300 group-hover:scale-110",
                  card.bg,
                  card.color
                )}
              >
                <card.icon size={24} />
              </div>
              <div>
                <h3 className="font-mono text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {value}
                </h3>
                <p className="text-muted-foreground mt-1 text-sm font-medium">
                  {card.title}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
