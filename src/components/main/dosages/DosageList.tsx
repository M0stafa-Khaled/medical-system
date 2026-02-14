import { TableCell } from "@/shared/components/ui/table";
import { motion } from "framer-motion";
import UpdateDosage from "./UpdateDosage";
import DeleteClinic from "./DeleteDosage";
import { tableRowVariants } from "@/animations";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { IDosage } from "@/interfaces/dashboard/dosages";

interface IProps {
  dosages: IDosage[];
}

const DosagesList = ({ dosages }: IProps) => {
  const canUpdateDosage = useHasPermission(PERMISSIONS.UPDATE_DOSAGE);
  const canDeleteDosage = useHasPermission(PERMISSIONS.DELETE_DOSAGE);

  if (!dosages.length) {
    return (
      <motion.tr
        initial="hidden"
        animate="visible"
        variants={tableRowVariants}
        className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
      >
        <TableCell
          colSpan={3}
          className="py-5 text-center text-sm font-medium text-black dark:text-white"
        >
          لا يوجد جرعات
        </TableCell>
      </motion.tr>
    );
  }

  return (
    <>
      {dosages.map(({ id, name }, index) => (
        <motion.tr
          key={id}
          initial="hidden"
          animate="visible"
          custom={index}
          variants={tableRowVariants}
          className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
        >
          <TableCell className="w-20 py-3 text-center text-sm font-medium text-black dark:text-white">
            {index + 1}
          </TableCell>
          <TableCell className="py-5 text-center text-sm font-medium text-black dark:text-white">
            {name}
          </TableCell>

          {(canUpdateDosage || canDeleteDosage) && (
            <TableCell className="text-center">
              <div className="flex items-center justify-center gap-2">
                {canUpdateDosage && <UpdateDosage name={name} id={id} />}
                {canDeleteDosage && (
                  <DeleteClinic name={name} id={id.toString()} />
                )}
              </div>
            </TableCell>
          )}
        </motion.tr>
      ))}
    </>
  );
};

export default DosagesList;
