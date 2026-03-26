import DataLoader from "@/shared/components/ui/DataLoader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { useGetPatientBalances } from "../queriesAndMutations";
import { PatientBalancesTable } from "../components/PatientBalancesTable";

const PatientBalancesPage = () => {
  const { data, isLoading } = useGetPatientBalances();

  if (isLoading) return <DataLoader />;

  const summary = data?.data;

  return (
    <section className="space-y-5">
      <Card className="overflow-hidden border-0 bg-linear-to-r from-indigo-500/10 via-cyan-500/10 to-emerald-500/10">
        <CardHeader className="flex flex-col items-start gap-2">
          <CardTitle className="text-xl sm:text-2xl">المدفوعات</CardTitle>
          <p className="text-muted-foreground text-sm">
            راقب إجمالي المدفوعات والمبالغ المستحقة وتفاصيل جميع العمليات.
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-emerald-500/30 bg-emerald-500/5">
          <CardHeader>
            <CardTitle className="text-sm text-emerald-700">
              إجمالي المدفوع
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {numberToPrice(summary?.total_amount_paid || 0)}
          </CardContent>
        </Card>

        <Card className="border-cyan-500/30 bg-cyan-500/5">
          <CardHeader>
            <CardTitle className="text-sm text-cyan-700">
              إجمالي المستحق
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {numberToPrice(summary?.total_amount_due || 0)}
          </CardContent>
        </Card>

        <Card className="border-indigo-500/30 bg-indigo-500/5">
          <CardHeader>
            <CardTitle className="text-sm text-indigo-700">
              الرصيد الحالي
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {numberToPrice(summary?.total_balance || 0)}
          </CardContent>
        </Card>

        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardHeader>
            <CardTitle className="text-sm text-amber-700">المسترد</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {numberToPrice(summary?.refund_amount || 0)}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>عمليات المدفوعات</CardTitle>
        </CardHeader>
        <CardContent>
          <PatientBalancesTable
            items={summary?.items || []}
            isLoading={false}
          />
        </CardContent>
      </Card>
    </section>
  );
};

export default PatientBalancesPage;
