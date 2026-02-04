import { Badge } from "@/components/ui/badge";
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import { IExpense } from "@/interfaces/dashboard/expenses";
import formatDateTime from "@/utils/formatDate";
import DeleteExpense from "./DeleteExpense";
import CancelExpense from "./CancelExpense";
import truncateText from "@/utils/truncateText";
import PrintExpenseReceipt from "./PrintExpenseReceipt";
import TooltipButton from "@/components/ui/TooltipButton";
import { numberToPrice } from "@/utils/numberToPrice";

interface IProps {
  expenses: IExpense[];
}

const ExpensesList = ({ expenses }: IProps) => {
  const canDeleteExpense = useHasPermission(
    PERMISSIONS.DELETE_EXPENSE_CATEGORY
  );
  const canCancelExpense = useHasPermission(PERMISSIONS.CANCEL_EXPENSE);
  const canViewExpense = useHasPermission(PERMISSIONS.VIEW_EXPENSE_CATEGORY);

  if (!expenses.length)
    return (
      <motion.tr
        initial="hidden"
        animate="visible"
        variants={tableRowVariants}
        className="dark:border-muted bg-white/40! dark:bg-dark/40! hover:bg-gray-200! dark:hover:bg-dark! transition-all duration-300"
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
          className="dark:border-muted bg-white/40! dark:bg-dark/40! hover:bg-gray-200! dark:hover:bg-dark! transition-all duration-300"
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
          {(canDeleteExpense || canCancelExpense || canViewExpense) && (
            <TableCell className="text-center">
              <div className="flex justify-center items-center gap-2">
                {canViewExpense && (
                  <TooltipButton title="عرض">
                    <Button className="h-auto py-0 px-0 bg-primary text-white dark:text-black gap-2 text-sm ">
                      <Link
                        to={`/dashboard/expenses/${expense?.id}`}
                        className="flex justify-center items-center gap-2 py-1 px-1 h-9 w-9"
                      >
                        <FiEye size={24} />
                      </Link>
                    </Button>
                  </TooltipButton>
                )}
                {canViewExpense && <PrintExpenseReceipt expense={expense} />}
                {canCancelExpense && expense?.status && (
                  <CancelExpense id={expense?.id} />
                )}
                {canDeleteExpense && !expense?.status && (
                  <DeleteExpense id={expense?.id} name={expense?.name} />
                )}
              </div>
            </TableCell>
          )}
        </motion.tr>
      ))}
    </>
  );
};

export default ExpensesList;
