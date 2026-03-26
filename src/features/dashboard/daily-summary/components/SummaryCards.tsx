import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { numberToPrice } from "@/shared/utils/numberToPrice";

// Icons as SVG components
const RevenueIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="text-muted-foreground h-4 w-4"
  >
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const ExpenseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="text-muted-foreground h-4 w-4"
  >
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
);

const RefundIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="text-muted-foreground h-4 w-4"
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </svg>
);

const NetPositionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="text-muted-foreground h-4 w-4"
  >
    <path d="M12 2v20M2 12h20" />
  </svg>
);

interface SummaryCardsProps {
  totalRevenue: number;
  totalExpenses: number;
  totalRefunds: number;
  // netRevenue: number;
  netPosition: number;
  transactionCount: number;
  expenseCount: number;
  refundCount: number;
}

export const SummaryCards = ({
  totalRevenue,
  totalExpenses,
  totalRefunds,
  // netRevenue,
  netPosition,
  transactionCount,
  expenseCount,
  refundCount,
}: SummaryCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Total Revenue Card */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            إجمالي الإيرادات
          </CardTitle>
          <RevenueIcon />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {numberToPrice(totalRevenue)}
          </div>
          <p className="text-muted-foreground text-xs">
            {transactionCount} معاملة
          </p>
        </CardContent>
      </Card>

      {/* Total Expenses Card */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            إجمالي المصروفات
          </CardTitle>
          <ExpenseIcon />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {numberToPrice(totalExpenses)}
          </div>
          <p className="text-muted-foreground text-xs">
            {expenseCount} بند مصروفات
          </p>
        </CardContent>
      </Card>

      {/* Total Refunds Card */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            إجمالي المستردات
          </CardTitle>
          <RefundIcon />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {numberToPrice(totalRefunds)}
          </div>
          <p className="text-muted-foreground text-xs">
            {refundCount} عملية استرداد
          </p>
        </CardContent>
      </Card>

      {/* Net Revenue Card */}
      {/* <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">صافي الإيرادات</CardTitle>
          <NetRevenueIcon />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${netRevenue >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {numberToPrice(netRevenue)}
          </div>
          <p className="text-muted-foreground text-xs">الإيرادات - المستردات</p>
        </CardContent>
      </Card> */}

      {/* Net Position Card (الإجمالي الصافي) */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">الإجمالي الصافي</CardTitle>
          <NetPositionIcon />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${netPosition >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {numberToPrice(netPosition)}
          </div>
          <p className="text-muted-foreground text-xs">
            صافي الإيرادات - المصروفات
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
