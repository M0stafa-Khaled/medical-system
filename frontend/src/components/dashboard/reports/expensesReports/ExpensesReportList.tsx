import { Badge } from "@/components/ui/badge";
import { TableCell } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import { IExpense } from "@/interfaces/dashboard/expenses";
import formatDateTime from "@/utils/formatDate";
import truncateText from "@/utils/truncateText";
import { numberToPrice } from "@/utils/numberToPrice";

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
        className="dark:border-muted !bg-white/40 dark:!bg-dark/40 hover:!bg-gray-200 dark:hover:!bg-dark transition-all duration-300"
      >
        <TableCell
          colSpan={8}
          className="text-sm text-center text-black dark:text-white py-5 font-medium"
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
          className="dark:border-muted !bg-white/40 dark:!bg-dark/40 hover:!bg-gray-200 dark:hover:!bg-dark transition-all duration-300"
        >
          <TableCell className="text-sm text-center text-black dark:text-white py-3 px-4 font-medium w-20">
            {expense?.code}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44 text-nowrap">
            {expense?.category?.name}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {numberToPrice(expense?.price)}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44">
            {expense?.treasury?.name}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44">
            <Link
              to={`/dashboard/employees/${expense?.employee.id}`}
              className="dark:hover:text-blue-500 transition-all duration-200"
            >
              {truncateText(expense?.employee?.name, 15)}
            </Link>
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {expense?.status ? (
              <Badge className="bg-emerald-600/30 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-800 dark:text-emerald-500 shadow-none rounded-full">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500 ml-2" />
                معتمد
              </Badge>
            ) : (
              <Badge className="bg-red-600/30 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 shadow-none rounded-full">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 ml-2" />
                ملغي
              </Badge>
            )}
          </TableCell>
          <TableCell className="min-w-40 text-sm text-center text-black dark:text-white py-3 font-medium max-w-44">
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
