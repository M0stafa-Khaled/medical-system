import { Badge } from "@/components/ui/badge";
import { TableCell } from "@/components/ui/table";
import { motion } from "framer-motion";
import UpdateClinic from "./UpdateClinic";
import DeleteClinic from "./DeleteClinic";
import { IClinic } from "@/interfaces/dashboard/clinic";
import { tableRowVariants } from "@/animations/dashboardAnimations";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
interface IProps {
  clinics: IClinic[];
}

const ClinicsList = ({ clinics }: IProps) => {
  const canUpdateClinic = useHasPermission(PERMISSIONS.UPDATE_CLINIC);
  const canDeleteClinic = useHasPermission(PERMISSIONS.DELETE_CLINIC);

  if (!clinics.length) {
    return (
      <motion.tr
        initial="hidden"
        animate="visible"
        variants={tableRowVariants}
        className="dark:border-muted !bg-white/40 dark:!bg-dark/40 hover:!bg-gray-200 dark:hover:!bg-dark transition-all duration-300"
      >
        <TableCell
          colSpan={4}
          className="text-sm text-center text-black dark:text-white py-5 font-medium"
        >
          لا يوجد عيادات
        </TableCell>
      </motion.tr>
    );
  }

  return (
    <>
      {clinics.map(({ id, name, status, virtual_number }, index) => (
        <motion.tr
          key={id}
          initial="hidden"
          animate="visible"
          custom={index}
          variants={tableRowVariants}
          className="dark:border-muted !bg-white/40 dark:!bg-dark/40 hover:!bg-gray-200 dark:hover:!bg-dark transition-all duration-300"
        >
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium w-20">
            {index + 1}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-5 font-medium">
            {name}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white">
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
          {(canUpdateClinic || canDeleteClinic) && (
            <TableCell className="text-center">
              <div className="flex justify-center items-center gap-2">
                {canUpdateClinic && (
                  <UpdateClinic
                    name={name}
                    id={id}
                    status={status}
                    virtual_number={+virtual_number}
                  />
                )}
                {canDeleteClinic && <DeleteClinic name={name} id={id} />}
              </div>
            </TableCell>
          )}
        </motion.tr>
      ))}
    </>
  );
};

export default ClinicsList;
