import { Badge } from "@/components/ui/badge";
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { IEmployee } from "@/interfaces/dashboard/employee";
import DeleteEmployee from "./DeleteEmployee";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import { IPaginationMeta } from "@/interfaces";
import countSerial from "@/utils/countSerial";
import truncateText from "@/utils/truncateText";
import TooltipButton from "@/components/ui/TooltipButton";
import { Pen } from "lucide-react";

interface IProps {
  employees: IEmployee[];
  meta?: IPaginationMeta;
}

const EmployeesList = ({ employees, meta }: IProps) => {
  const canUpdateEmployee = useHasPermission(PERMISSIONS.UPDATE_EMPLOYEE);
  const canDeleteEmployee = useHasPermission(PERMISSIONS.DELETE_EMPLOYEE);
  const canViewEmployee = useHasPermission(PERMISSIONS.VIEW_EMPLOYEE);

  if (!employees.length)
    return (
      <motion.tr
        initial="hidden"
        animate="visible"
        variants={tableRowVariants}
        className="dark:border-muted !bg-white/40 dark:!bg-dark/40 hover:!bg-gray-200 dark:hover:!bg-dark transition-all duration-300"
      >
        <TableCell
          colSpan={6}
          className="text-sm text-center text-black dark:text-white py-5 font-medium"
        >
          لا يوجد موظفين
        </TableCell>
      </motion.tr>
    );
  return (
    <>
      {employees.map(({ id, name, status, image, first_phone }, index) => (
        <motion.tr
          key={id}
          initial="hidden"
          animate="visible"
          custom={index}
          variants={tableRowVariants}
          className="dark:border-muted !bg-white/40 dark:!bg-dark/40 hover:!bg-gray-200 dark:hover:!bg-dark transition-all duration-300"
        >
          <TableCell className="text-sm text-center text-black dark:text-white py-3 px-4 font-medium w-20">
            {countSerial({ meta: meta!, index })}
          </TableCell>
          <TableCell className="flex justify-center items-center text-sm text-center text-black dark:text-white py-3 font-medium">
            <img
              src={image || "/images/avatar.svg"}
              alt={name}
              className="w-12 h-12 rounded-full object-cover"
            />
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44 text-nowrap">
            {truncateText(name, 15)}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44">
            {first_phone}
          </TableCell>

          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {status ? (
              <Badge className="bg-emerald-600/30 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-800 dark:text-emerald-500 shadow-none rounded-full">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500 ml-2" />
                نشط
              </Badge>
            ) : (
              <Badge className="bg-red-600/30 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 shadow-none rounded-full">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 ml-2" />
                غير نشط
              </Badge>
            )}
          </TableCell>
          {(canDeleteEmployee || canUpdateEmployee || canViewEmployee) && (
            <TableCell className="text-center">
              <div className="flex justify-center items-center gap-2">
                {canViewEmployee && (
                  <TooltipButton title="عرض">
                    <Button className="h-auto py-0 px-0 bg-primary text-white dark:text-black gap-2 text-sm">
                      <Link
                        to={`/dashboard/employees/${id}`}
                        className="flex justify-center items-center gap-2 py-1 px-1 h-9 w-9"
                      >
                        <FiEye size={24} />
                      </Link>
                    </Button>
                  </TooltipButton>
                )}
                {canUpdateEmployee && (
                  <TooltipButton title="تعديل">
                    <Button className="h-auto py-0 px-0 bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm">
                      <Link
                        to={`/dashboard/employees/${id}/update`}
                        className="flex justify-center items-center gap-2 py-1 px-1 w-9 h-9"
                      >
                        <Pen size={20} />
                      </Link>
                    </Button>
                  </TooltipButton>
                )}
                {canDeleteEmployee && <DeleteEmployee name={name} id={id} />}
              </div>
            </TableCell>
          )}
        </motion.tr>
      ))}
    </>
  );
};

export default EmployeesList;
