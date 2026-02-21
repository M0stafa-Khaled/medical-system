import { TableCell } from "@/shared/components/ui/table";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/shared/animations";
import formatDateTime from "@/shared/utils/formatDate";
import { ITreasuryReport } from "@/interfaces/dashboard/reports";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { Badge } from "@/shared/components/ui/badge";

interface IProps {
  treasuriesReports: ITreasuryReport[];
}

const TransfersReportList = ({
  treasuriesReports: treasuriesReports,
}: IProps) => {
  if (!treasuriesReports.length)
    return (
      <motion.tr
        initial="hidden"
        animate="visible"
        variants={tableRowVariants}
        className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
      >
        <TableCell
          colSpan={6}
          className="py-5 text-center text-sm font-medium text-black dark:text-white"
        >
          لا يوجد عمليات
        </TableCell>
      </motion.tr>
    );

  return (
    <>
      {treasuriesReports?.map((report, index) => (
        <motion.tr
          key={report?.id}
          initial="hidden"
          animate="visible"
          custom={index}
          variants={tableRowVariants}
          className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 *:whitespace-nowrap hover:bg-gray-200!"
        >
          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {report?.type === "transactions"
              ? "ايرادات"
              : report?.type === "expenses"
                ? "مصروفات"
                : "تحويلات خزائن"}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {report?.details.code || "غير متوفر"}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {report.details.amount
              ? numberToPrice(report.details.amount)
              : "غير متوفر"}
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {report.details.status === 1 ? (
              <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
                <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
                معتمد
              </Badge>
            ) : report.details.status == 0 ? (
              <Badge className="rounded-full bg-red-600/30 text-red-500 shadow-none hover:bg-red-600/10 dark:bg-red-600/20">
                <div className="ml-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                ملغي
              </Badge>
            ) : (
              <Badge className="rounded-full bg-blue-600/30 text-blue-500 shadow-none hover:bg-blue-600/10 dark:bg-blue-600/20">
                <div className="ml-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
                غير متوفر
              </Badge>
            )}
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {report.details.employee}
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {formatDateTime(report?.created_at as string)}
          </TableCell>
        </motion.tr>
      ))}
    </>
  );
};

export default TransfersReportList;
