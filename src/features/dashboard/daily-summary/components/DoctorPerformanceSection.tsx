import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { IDoctorTotals } from "../types";

interface DoctorPerformanceSectionProps {
  doctorTotals: IDoctorTotals[];
  systemTotals: {
    totalRevenue: number;
    netRevenue: number;
    totalDoctorCommission: number;
    totalCenterShare: number;
    totalExpenses: number;
    netPosition: number;
    transactionCount: number | undefined;
    totalActionsCount: { name: string; count: number }[];
  };
}

const tableHeaders = [
  "#",
  "اسم الطبيب",
  "النسبة",
  "اجمالي الإيرادات",
  "صافي الإيرادات",
  "نصيب الطبيب",
  "نصيب المركز",
  "المعاملات",
  "تفاصيل الخدمات",
];

export const DoctorPerformanceSection = ({
  doctorTotals,
}: DoctorPerformanceSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ملخص أداء الأطباء</CardTitle>
        <CardDescription>إجماليات الإيرادات والعمولات لكل طبيب</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="border-border bg-card max-w-full overflow-hidden rounded-md border shadow-sm">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-muted/40 border-border border-b">
                {tableHeaders.map((t, idx) => (
                  <TableHead
                    key={idx}
                    className="text-muted-foreground py-3 text-center font-medium text-nowrap"
                  >
                    {t}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctorTotals.length > 0 ? (
                doctorTotals.map((doctor, index) => (
                  <TableRow
                    className="border-border/60 odd:bg-muted/20 hover:bg-muted/50 border-b text-center font-bold text-nowrap transition-colors"
                    key={doctor.doctorId}
                  >
                    <TableCell className="text-foreground py-3">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-foreground py-3">
                      {doctor.doctorName}
                    </TableCell>
                    <TableCell className="text-foreground py-3">
                      <Badge variant="default" className="bg-blue-600">
                        {doctor.commission.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-orange-600">
                      {numberToPrice(doctor.totalRevenue)}
                    </TableCell>
                    <TableCell className="py-3 text-green-600">
                      {numberToPrice(doctor.netRevenue)}
                    </TableCell>
                    <TableCell className="py-3 text-blue-600">
                      {numberToPrice(doctor.doctorCommission)}
                    </TableCell>
                    <TableCell className="py-3 text-purple-600">
                      {numberToPrice(doctor.centerShare)}
                    </TableCell>

                    <TableCell className="text-foreground py-3">
                      <Badge variant="secondary">
                        {doctor.transactionCount}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground py-3">
                      <div className="flex flex-wrap gap-1">
                        {doctor.actionsCount.length > 0 ? (
                          doctor.actionsCount.map((action, actionIndex) => (
                            <Badge
                              key={actionIndex}
                              variant="outline"
                              className="text-xs"
                            >
                              {action.name}:{" "}
                              <span className="mr-1 font-bold">
                                {action.count}
                              </span>
                            </Badge>
                          ))
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            لا توجد خدمات
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-muted-foreground py-4 text-center"
                  >
                    لا يوجد أطباء
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            {doctorTotals.length > 0 && (
              <TableFooter>
                <TableRow className="bg-muted/40 border-border border-b">
                  {tableHeaders.map((t, idx) => (
                    <TableHead
                      key={idx}
                      className="text-muted-foreground py-3 text-center font-medium text-nowrap"
                    >
                      {t}
                    </TableHead>
                  ))}
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
