import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import DateFilter from "@/shared/components/ui/date-filter";
import DataLoader from "@/shared/components/ui/DataLoader";
import { useGetDailySummary } from "../queries";
import { SummaryCards } from "../components/SummaryCards";
import { DoctorPerformanceSection } from "../components/DoctorPerformanceSection";
import { RefundsTable } from "../components/RefundsTable";
import { TransactionsTable } from "../components/TransactionsTable";
import { ExpensesTable } from "../components/ExpensesTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import type { IActionCount, IDoctorTotals, ISystemTotals } from "../types";

export default function DailySummary() {
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [showRefunds, setShowRefunds] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showExpenses, setShowExpenses] = useState(false);

  const { data, isLoading } = useGetDailySummary(createdAt || undefined);

  const doctorTotals = useMemo(() => {
    const doctorMap = new Map<number, IDoctorTotals>();

    // Step 1: Create doctors from transactions ONLY
    data?.transactions.forEach((transaction) => {
      const doctorId = transaction.doctor.item.id;
      const commission = parseFloat(transaction.doctor.item.commission);

      const existing = doctorMap.get(doctorId) || {
        doctorId,
        doctorName: transaction.doctor.item.name,
        commission: commission,
        totalRevenue: 0,
        netRevenue: 0,
        doctorCommission: 0,
        centerShare: 0,
        transactionCount: 0,
        expenseCount: 0,
        actionsCount: [],
      };

      existing.commission = commission;
      existing.totalRevenue += parseFloat(transaction.balance.amount_paid);
      existing.netRevenue += parseFloat(transaction.balance.amount_paid);
      existing.transactionCount += 1;

      // Count actions by type for this doctor
      transaction.actions.forEach((action) => {
        const existingAction = existing.actionsCount.find(
          (a) => a.name === action.name
        );
        if (existingAction) {
          existingAction.count += 1;
        } else {
          existing.actionsCount.push({ name: action.name, count: 1 });
        }
      });

      doctorMap.set(doctorId, existing);
    });

    // Step 2: Process refunds - only for doctors that exist in the map
    data?.refunds.forEach((refund) => {
      const doctorId = refund.doctor.item.id;
      const existing = doctorMap.get(doctorId);
      if (existing) {
        existing.netRevenue -= parseFloat(refund.balance.refund_amount);
      }
    });

    // Step 3: Calculate commission amounts after all data is processed
    doctorMap.forEach((doctor) => {
      doctor.doctorCommission = doctor.netRevenue * (doctor.commission / 100);
      doctor.centerShare = doctor.netRevenue - doctor.doctorCommission;
    });

    return Array.from(doctorMap.values()).sort((a, b) =>
      a.doctorName.localeCompare(b.doctorName, "ar")
    );
  }, [data]);
  // Calculate system-wide totals
  const systemTotals: ISystemTotals = useMemo(() => {
    const totalExpenses =
      data?.expenses.reduce(
        (sum, expense) => sum + parseFloat(expense.price),
        0
      ) || 0;
    const totalRevenue =
      data?.transactions.reduce(
        (sum, transaction) => sum + parseFloat(transaction.balance.amount_paid),
        0
      ) || 0;
    const totalRefunds =
      data?.refunds.reduce(
        (sum, refund) => sum + parseFloat(refund.balance.refund_amount),
        0
      ) || 0;
    const netRevenue = totalRevenue;
    const netPosition = netRevenue - totalExpenses;

    // Calculate total doctor commissions and center share
    const totalDoctorCommission =
      doctorTotals.reduce((sum, doctor) => sum + doctor.doctorCommission, 0) ||
      0;
    const totalCenterShare =
      doctorTotals.reduce((sum, doctor) => sum + doctor.centerShare, 0) || 0;

    // Count all actions system-wide
    const totalActionsCount: IActionCount[] = [];
    data?.transactions.forEach((transaction) => {
      transaction.actions.forEach((action) => {
        const existingAction = totalActionsCount.find(
          (a) => a.name === action.name
        );
        if (existingAction) {
          existingAction.count += 1;
        } else {
          totalActionsCount.push({ name: action.name, count: 1 });
        }
      });
    });

    return {
      totalExpenses,
      totalRevenue,
      totalRefunds,
      netRevenue,
      netPosition,
      totalDoctorCommission,
      totalCenterShare,
      transactionCount: data?.transactions.length,
      expenseCount: data?.expenses.length,
      refundCount: data?.refunds.length,
      totalActionsCount,
    };
  }, [doctorTotals, data]);
  if (isLoading) return <DataLoader />;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <h1 className="text-3xl font-bold tracking-tight">
            تقرير الملخص اليومي
          </h1>
          <div className="w-64">
            <DateFilter
              handleFilterChange={(_, value) => setCreatedAt(value)}
              filterKey="created_at"
              value={createdAt}
              placeholder="اختر التاريخ"
            />
          </div>
        </div>
        <p className="text-muted-foreground">
          نظرة عامة على أداء الأطباء والمصروفات والإيرادات وإجماليات النظام
          {createdAt
            ? ` ليوم ${new Date(createdAt).toLocaleDateString("ar-EG", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}`
            : " - اختر تاريخ لعرض بياناته"}
        </p>
      </div>

      <SummaryCards
        totalRevenue={systemTotals.totalRevenue}
        totalExpenses={systemTotals.totalExpenses}
        totalRefunds={systemTotals.totalRefunds}
        // netRevenue={systemTotals.netRevenue}
        netPosition={systemTotals.netPosition}
        transactionCount={systemTotals.transactionCount || 0}
        expenseCount={systemTotals.expenseCount || 0}
        refundCount={systemTotals.refundCount || 0}
      />

      <DoctorPerformanceSection
        doctorTotals={doctorTotals}
        systemTotals={{
          totalRevenue: systemTotals.totalRevenue,
          netRevenue: systemTotals.netRevenue,
          totalDoctorCommission: systemTotals.totalDoctorCommission,
          totalCenterShare: systemTotals.totalCenterShare,
          totalExpenses: systemTotals.totalExpenses,
          netPosition: systemTotals.netPosition,
          transactionCount: systemTotals.transactionCount,
          totalActionsCount: systemTotals.totalActionsCount,
        }}
      />

      <Card className="overflow-hidden">
        <CardHeader
          className="flex cursor-pointer flex-row items-center justify-between"
          onClick={() => setShowRefunds(!showRefunds)}
        >
          <div>
            <CardTitle className="flex items-center gap-2">
              المستردات
              <Badge variant="destructive" className="text-white!">
                {data?.refunds.length}
              </Badge>
            </CardTitle>
            <CardDescription>
              قائمة بجميع عمليات الاسترداد المعالجة اليوم
            </CardDescription>
          </div>
          <button className="hover:bg-muted rounded-md p-2 transition-colors">
            {showRefunds ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </CardHeader>
        {showRefunds && (
          <CardContent className="p-0">
            <RefundsTable refunds={data?.refunds || []} />
          </CardContent>
        )}
      </Card>

      <Card className="overflow-hidden">
        <CardHeader
          className="flex cursor-pointer flex-row items-center justify-between"
          onClick={() => setShowTransactions(!showTransactions)}
        >
          <div>
            <CardTitle className="flex items-center gap-2">
              معاملات اليوم
              <Badge variant="default" className="text-white!">
                {data?.transactions.length}
              </Badge>
            </CardTitle>
            <CardDescription>
              قائمة تفصيلية بجميع المعاملات لليوم
            </CardDescription>
          </div>
          <button className="hover:bg-muted rounded-md p-2 transition-colors">
            {showTransactions ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </CardHeader>
        {showTransactions && (
          <CardContent className="p-0">
            <TransactionsTable transactions={data?.transactions || []} />
          </CardContent>
        )}
      </Card>

      <Card className="overflow-hidden">
        <CardHeader
          className="flex cursor-pointer flex-row items-center justify-between"
          onClick={() => setShowExpenses(!showExpenses)}
        >
          <div>
            <CardTitle className="flex items-center gap-2">
              مصروفات اليوم
              <Badge variant="destructive" className="text-white!">
                {data?.expenses.length}
              </Badge>
            </CardTitle>
            <CardDescription>
              قائمة تفصيلية بجميع المصروفات لليوم
            </CardDescription>
          </div>
          <button className="hover:bg-muted rounded-md p-2 transition-colors">
            {showExpenses ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </CardHeader>
        {showExpenses && (
          <CardContent className="p-0">
            <ExpensesTable expenses={data?.expenses || []} />
          </CardContent>
        )}
      </Card>
    </div>
  );
}
