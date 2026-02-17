import { Badge } from "@/shared/components/ui/badge";
import { TableCell } from "@/shared/components/ui/table";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import { IExpense } from "@/features/dashboard/expenses/types";
import formatDateTime from "@/shared/utils/formatDate";
import truncateText from "@/shared/utils/truncateText";
import { numberToPrice } from "@/shared/utils/numberToPrice";

interface IProps {
  expenses: IExpense[];
}

const ExpensesReportList = ({ expenses }: IProps) => {
  if (!expenses.length)
    return (
      <motion.tr
        initial="hidden"
        animate="visible"
        variants={tableRowVariants}
        className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
      >
        <TableCell
          colSpan={8}
          className="py-5 text-center text-sm font-medium text-black dark:text-white"
        >
          لا يوجد مصروفات
        </TableCell>
      </motion.tr>
    );
  return (
    <>
      {expenses.map((expense, index) => (
        <motion.tr
          key={expense?.id}
          initial="hidden"
          animate="visible"
          custom={index}
          variants={tableRowVariants}
          className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
        >
          <TableCell className="w-20 px-4 py-3 text-center text-sm font-medium text-black dark:text-white">
            {expense?.code}
          </TableCell>
          <TableCell className="max-w-44 py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {expense?.category?.name}
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {numberToPrice(expense?.price)}
          </TableCell>
          <TableCell className="max-w-44 py-3 text-center text-sm font-medium text-black dark:text-white">
            {expense?.treasury?.name}
          </TableCell>
          <TableCell className="max-w-44 py-3 text-center text-sm font-medium text-black dark:text-white">
            <Link
              to={`/dashboard/employees/${expense?.employee.id}`}
              className="transition-all duration-200 dark:hover:text-blue-500"
            >
              {truncateText(expense?.employee?.name, 15)}
            </Link>
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {expense?.status ? (
              <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
                <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
                معتمد
              </Badge>
            ) : (
              <Badge className="rounded-full bg-red-600/30 text-red-500 shadow-none hover:bg-red-600/10 dark:bg-red-600/20">
                <div className="ml-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                ملغي
              </Badge>
            )}
          </TableCell>
          <TableCell className="max-w-44 min-w-40 py-3 text-center text-sm font-medium text-black dark:text-white">
            {formatDateTime(expense?.created_at, {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </TableCell>
          <TableCell className="text-center"></TableCell>
        </motion.tr>
      ))}
    </>
  );
};

export default ExpensesReportList;
