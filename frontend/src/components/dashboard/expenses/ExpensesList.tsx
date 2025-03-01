import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations/dashboardAnimations";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import { IExpense } from "@/interfaces/expense";
import formatDateTime from "@/utils/formatDate";
import { IPaginationMeta } from "@/interfaces";
import countSerial from "@/utils/countSerial";
import DeleteExpenseButton from "./DeleteExpenseModalButton";
import CancelExpenseButton from "./CancelExpenseModalButton";
import { FaPrint } from "react-icons/fa6";

interface IProps {
  expenses: IExpense[];
  meta?: IPaginationMeta;
}

const ExpensesList = ({ expenses, meta }: IProps) => {
  const canDeleteExpense = useHasPermission(
    PERMISSIONS.DELETE_EXPENSE_CATEGORY
  );
  const canCancelExpense = useHasPermission(PERMISSIONS.CANCEL_EXPENSE);
  const canViewExpense = useHasPermission(PERMISSIONS.VIEW_EXPENSE_CATEGORY);

  if (!expenses.length)
    return (
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
        <TableCell
          colSpan={7}
          className="text-sm text-center text-black dark:text-white py-5 font-medium"
        >
          لا يوجد مصروفات
        </TableCell>
      </TableRow>
    );
  return (
    <>
      {expenses.map(
        (
          { id, name, status, category, created_at, employee, treasury },
          index
        ) => (
          <motion.tr
            key={id}
            initial="hidden"
            animate="visible"
            custom={index}
            variants={tableRowVariants}
            className="dark:border-muted bg-white/20 dark:bg-dark/40 dark:hover:bg-dark transition-all duration-300"
          >
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44 text-wrap">
              {countSerial({ meta: meta!, index })}
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44 text-wrap">
              {name}
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44">
              {category?.name}
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44">
              {treasury?.name}
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44">
              <Link
                to={`/dashboard/employees/${employee.id}`}
                className="dark:hover:text-blue-500 transition-all duration-200"
              >
                {employee?.name}
              </Link>
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
              {status ? (
                <Badge className="bg-green-500 hover:bg-green-500">معتمد</Badge>
              ) : (
                <Badge variant={"destructive"}>ملغي</Badge>
              )}
            </TableCell>
            <TableCell className="min-w-40 text-sm text-center text-black dark:text-white py-3 font-medium max-w-44">
              {formatDateTime(created_at, {
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
                    <Button className="h-auto py-0 px-0 bg-primary text-white dark:text-black gap-2 text-sm ">
                      <Link
                        to={`/dashboard/expenses/${id}`}
                        className="flex justify-center items-center gap-2 py-1 px-1 h-9 w-9"
                      >
                        <FiEye size={24} />
                      </Link>
                    </Button>
                  )}
                  {canViewExpense && (
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm h-9 w-9">
                      <FaPrint size={24} />
                    </Button>
                  )}
                  {canCancelExpense && status && (
                    <CancelExpenseButton id={id} />
                  )}
                  {canDeleteExpense && !status && (
                    <DeleteExpenseButton id={id} name={name} />
                  )}
                </div>
              </TableCell>
            )}
          </motion.tr>
        )
      )}
    </>
  );
};

export default ExpensesList;
