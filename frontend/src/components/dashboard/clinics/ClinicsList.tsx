import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import EditClinicModalButton from "./EditClinicModalButton";
import DeleteClinicButton from "./DeleteClinicModalButton";
import { IClinic } from "@/interfaces/dashboard/clinic";
import { tableRowVariants } from "@/animations/dashboardAnimations";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
interface IProps {
  clinics: IClinic[];
}

const ClinicsList = ({ clinics }: IProps) => {
  const canEditClinic = useHasPermission(PERMISSIONS.EDIT_CLINIC);
  const canDeleteClinic = useHasPermission(PERMISSIONS.DELETE_CLINIC);

  if (!clinics.length) {
    return (
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
        <TableCell
          colSpan={4}
          className="text-sm text-center text-black dark:text-white py-5 font-medium"
        >
          لا يوجد عيادات
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {clinics.map(({ id, name, status }, index) => (
        <motion.tr
          key={id}
          initial="hidden"
          animate="visible"
          custom={index}
          variants={tableRowVariants}
          className="dark:border-muted bg-white/20 dark:bg-dark/40 dark:hover:bg-dark transition-all duration-300"
        >
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium w-20 text-wrap">
            {index + 1}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-5 font-medium">
            {name}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white">
            {status ? (
              <Badge className="bg-green-500 hover:bg-green-500">متاحة</Badge>
            ) : (
              <Badge variant={"destructive"}>غير متاحة</Badge>
            )}
          </TableCell>
          {(canEditClinic || canDeleteClinic) && (
            <TableCell className="text-center">
              <div className="flex justify-center items-center gap-2">
                {canEditClinic && (
                  <EditClinicModalButton name={name} id={id} status={status} />
                )}
                {canDeleteClinic && <DeleteClinicButton name={name} id={id} />}
              </div>
            </TableCell>
          )}
        </motion.tr>
      ))}
    </>
  );
};

export default ClinicsList;
