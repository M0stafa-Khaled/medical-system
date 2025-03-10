import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { IEmployee } from "@/interfaces/dashboard/employee";
import DeleteEmployeeButton from "./DeleteEmployeeModalButton";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations/dashboardAnimations";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import { IPaginationMeta } from "@/interfaces";
import countSerial from "@/utils/countSerial";
import truncateText from "@/utils/truncateText";

interface IProps {
  employees: IEmployee[];
  meta?: IPaginationMeta;
}

const EmployeesList = ({ employees, meta }: IProps) => {
  const canEditEmployee = useHasPermission(PERMISSIONS.EDIT_EMPLOYEE);
  const canDeleteEmployee = useHasPermission(PERMISSIONS.DELETE_EMPLOYEE);
  const canViewEmployee = useHasPermission(PERMISSIONS.VIEW_EMPLOYEE);

  if (!employees.length)
    return (
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
        <TableCell
          colSpan={6}
          className="text-sm text-center text-black dark:text-white py-5 font-medium"
        >
          لا يوجد موظفين
        </TableCell>
      </TableRow>
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
          className="dark:border-muted bg-white/20 dark:bg-dark/40 dark:hover:bg-dark transition-all duration-300"
        >
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium w-20 text-wrap">
            {countSerial({ meta: meta!, index })}
          </TableCell>
          <TableCell className="flex justify-center items-center text-sm text-center text-black dark:text-white py-3 font-medium">
            <img
              src={image || "/avatar.svg"}
              alt={name}
              className="w-12 h-12 rounded-full object-cover"
            />
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44 text-wrap">
            {truncateText(name, 15)}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44">
            {first_phone}
          </TableCell>

          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {status ? (
              <Badge className="bg-green-500 hover:bg-green-500">مفعل </Badge>
            ) : (
              <Badge variant={"destructive"}>غير مفعل</Badge>
            )}
          </TableCell>
          {(canDeleteEmployee || canEditEmployee || canViewEmployee) && (
            <TableCell className="text-center">
              <div className="flex justify-center items-center gap-2">
                {canViewEmployee && (
                  <Button className="h-auto py-0 px-0 bg-primary text-white dark:text-black gap-2 text-sm">
                    <Link
                      to={`/dashboard/employees/${id}`}
                      className="flex justify-center items-center gap-2 py-1 px-1 h-9 w-9"
                    >
                      <FiEye size={24} />
                    </Link>
                  </Button>
                )}
                {canEditEmployee && (
                  <Button className="h-auto py-0 px-0 bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm">
                    <Link
                      to={`/dashboard/employees/update/${id}`}
                      className="flex justify-center items-center gap-2 py-1 px-1 w-9 h-9"
                    >
                      <FaPencil size={18} />
                    </Link>
                  </Button>
                )}
                {canDeleteEmployee && (
                  <DeleteEmployeeButton name={name} id={id} />
                )}
              </div>
            </TableCell>
          )}
        </motion.tr>
      ))}
    </>
  );
};

export default EmployeesList;
