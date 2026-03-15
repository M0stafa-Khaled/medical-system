import { motion } from "framer-motion";
import { itemVariants } from "@/shared/animations";
import { Card, CardContent } from "@/shared/components/ui/card";
import { DollarSign, Percent } from "lucide-react";
import { numberToPrice } from "@/shared/utils/numberToPrice";

interface DoctorTransactionsStatsProps {
  commission: string | undefined;
  totalAmount: number | undefined;
}

export const DoctorTransactionsStats = ({
  commission,
  totalAmount,
}: DoctorTransactionsStatsProps) => {
  const stats = [
    {
      title: "العمولة",
      value: commission || "0%",
      icon: Percent,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
      textColor: "text-orange-600 dark:text-orange-400",
    },
    {
      title: "المبلغ الإجمالي",
      value: numberToPrice(totalAmount ?? 0),
      icon: DollarSign,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      textColor: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`border-0 ${stat.bgColor} overflow-hidden`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`h-12 w-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
