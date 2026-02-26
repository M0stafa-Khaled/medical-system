import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { DataTable } from "@/shared/components/data-table";
import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { useGetPatientBalancesReport } from "../../queriesAndMutations";
import { usePatientBalancesReportColumns } from "./PatientBalancesReportColumns";
import { IPatientBalancesReportFilter } from "../../types";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { Card, CardContent } from "@/shared/components/ui/card";
import { DollarSign, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/shared/animations";

export const PatientBalancesReportTable = () => {
  const [searchParams] = useSearchParams();

  const patientId = searchParams.get("patient_id") || "";

  const filters: IPatientBalancesReportFilter = useMemo(
    () => ({
      start_at: searchParams.get("start_at") || "",
      end_at: searchParams.get("end_at") || "",
      payment_method: searchParams.get("payment_method") || "",
    }),
    [searchParams]
  );

  const {
    data: report,
    isLoading,
    isError,
  } = useGetPatientBalancesReport(patientId, {
    filter: {
      ...(filters.payment_method &&
        filters.payment_method !== "all" && {
          payment_method: filters.payment_method,
        }),
    },
    ...(filters.start_at ? { start_at: filters.start_at } : {}),
    ...(filters.end_at ? { end_at: filters.end_at } : {}),
  });

  useEffect(() => {
    if (report?.message && !report.status) toast.error(report.message);
    if (isError) {
      toast.error("حدث خطأ أثناء تحميل بيانات التقرير");
    }
  }, [report?.message, report?.status, isError]);

  const columns = usePatientBalancesReportColumns();

  const summaryCards = [
    {
      label: "إجمالي المستحق",
      value: numberToPrice(report?.data?.total_amount_due ?? 0),
      icon: <DollarSign className="h-5 w-5 text-red-500" />,
      colorClass: "border-red-200 dark:border-red-800/50",
      bgClass: "bg-red-500/10",
    },
    {
      label: "إجمالي المدفوع",
      value: numberToPrice(report?.data?.total_amount_paid ?? 0),
      icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
      colorClass: "border-emerald-200 dark:border-emerald-800/50",
      bgClass: "bg-emerald-500/10",
    },
    {
      label: "الرصيد الإجمالي",
      value: numberToPrice(report?.data?.total_balance ?? 0),
      icon: <Wallet className="text-primary h-5 w-5" />,
      colorClass: "border-primary/30",
      bgClass: "bg-primary/10",
    },
    {
      label: "إجمالي المسترد",
      value: numberToPrice(report?.data?.refund_amount ?? 0),
      icon: <TrendingDown className="h-5 w-5 text-amber-500" />,
      colorClass: "border-amber-200 dark:border-amber-800/50",
      bgClass: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Summary Cards — only visible when a patient is selected */}
      {patientId && !isLoading && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-3 lg:grid-cols-4"
        >
          {summaryCards.map((card) => (
            <motion.div key={card.label} variants={itemVariants}>
              <Card
                className={`border ${card.colorClass} overflow-hidden shadow-sm`}
              >
                <CardContent className="flex items-center gap-3 py-4">
                  <div className={`rounded-xl p-2.5 ${card.bgClass}`}>
                    {card.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-muted-foreground truncate text-xs">
                      {card.label}
                    </p>
                    <p className="mt-0.5 truncate text-sm font-semibold">
                      {card.value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty state when no patient selected */}
      {!patientId && (
        <div className="border-border bg-muted/20 flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
          <Wallet className="text-muted-foreground/40 mb-3 h-12 w-12" />
          <p className="text-muted-foreground text-sm font-medium">
            اختر مريضًا من القائمة لعرض تقرير الحساب
          </p>
        </div>
      )}

      {/* Table */}
      {patientId && (
        <DataTable
          isLoading={isLoading}
          data={report?.data?.items || []}
          columns={columns}
          skeleton={<TableSkeleton columns={7} rows={6} showButtons={false} />}
        />
      )}
    </div>
  );
};
