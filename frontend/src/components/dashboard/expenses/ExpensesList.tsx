import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations/dashboardAnimations";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import { IExpense } from "@/interfaces/expense";
import formatDateTime from "@/utils/formatDate";

interface IProps {
  expenses: IExpense[];
}

const ExpensesList = ({ expenses }: IProps) => {
  const canEditPatient = useHasPermission(PERMISSIONS.EDIT_PATIENT);
  const canDeletePatient = useHasPermission(PERMISSIONS.DELETE_PATIENT);
  const canViewPatient = useHasPermission(PERMISSIONS.VIEW_PATIENT);

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
          idx
        ) => (
          <motion.tr
            key={id}
            initial="hidden"
            animate="visible"
            custom={idx}
            variants={tableRowVariants}
            className="dark:border-muted bg-white/20 dark:bg-dark/40 dark:hover:bg-dark transition-all duration-300"
          >
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
            {(canDeletePatient || canEditPatient || canViewPatient) && (
              <TableCell className="text-center">
                <div className="flex justify-center items-center gap-3">
                  {canViewPatient && (
                    <Button className="h-auto py-0 px-0 bg-primary text-white dark:text-black gap-2 text-sm ">
                      <Link
                        to={`/dashboard/expenses/${id}`}
                        className="flex justify-center items-center gap-2 py-1 px-1 h-9 w-9"
                      >
                        <FiEye size={24} />
                      </Link>
                    </Button>
                  )}
                  {canEditPatient && (
                    <Button className="h-auto py-0 px-0 bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm">
                      <Link
                        to={`/dashboard/expenses/update/${id}`}
                        className="flex justify-center items-center gap-2 py-1 px-1 w-9 h-9"
                      >
                        <FaPencil size={18} />
                      </Link>
                    </Button>
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
