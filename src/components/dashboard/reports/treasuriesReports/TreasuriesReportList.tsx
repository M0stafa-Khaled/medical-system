import { TableCell } from "@/components/ui/table";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import formatDateTime from "@/utils/formatDate";
import { ITreasuryReport } from "@/interfaces/dashboard/reports";
import { numberToPrice } from "@/utils/numberToPrice";
import { Badge } from "@/components/ui/badge";

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
        className="dark:border-muted bg-white/40! dark:bg-dark/40! hover:bg-gray-200! dark:hover:bg-dark! transition-all duration-300"
      >
        <TableCell
          colSpan={6}
          className="text-sm text-center text-black dark:text-white py-5 font-medium"
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
          className="dark:border-muted bg-white/40! dark:bg-dark/40! hover:bg-gray-200! dark:hover:bg-dark! transition-all duration-300 *:whitespace-nowrap"
        >
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {report?.type === "transactions"
              ? "ايرادات"
              : report?.type === "expenses"
              ? "مصروفات"
              : "تحويلات خزائن"}
          </TableCell>

          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {report?.details.code || "غير متوفر"}
          </TableCell>

          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {report.details.amount
              ? numberToPrice(report.details.amount)
              : "غير متوفر"}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {report.details.status === 1 ? (
              <Badge className="bg-emerald-600/30 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-800 dark:text-emerald-500 shadow-none rounded-full">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500 ml-2" />
                معتمد
              </Badge>
            ) : report.details.status == 0 ? (
              <Badge className="bg-red-600/30 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 shadow-none rounded-full">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 ml-2" />
                ملغي
              </Badge>
            ) : (
              <Badge className="bg-blue-600/30 dark:bg-blue-600/20 hover:bg-blue-600/10 text-blue-500 shadow-none rounded-full">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 ml-2" />
                غير متوفر
              </Badge>
            )}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {report.details.employee}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {formatDateTime(report?.created_at as string)}
          </TableCell>
        </motion.tr>
      ))}
    </>
  );
};

export default TransfersReportList;
