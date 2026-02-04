import { TableCell } from "@/components/ui/table";
import { motion } from "framer-motion";
import UpdateDosage from "./UpdateDosage";
import DeleteClinic from "./DeleteDosage";
import { tableRowVariants } from "@/animations";
import useHasPermission from "@/hooks/useHasPermission";
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
        className="dark:border-muted bg-white/40! dark:bg-dark/40! hover:bg-gray-200! dark:hover:bg-dark! transition-all duration-300"
      >
        <TableCell
          colSpan={3}
          className="text-sm text-center text-black dark:text-white py-5 font-medium"
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
          className="dark:border-muted bg-white/40! dark:bg-dark/40! hover:bg-gray-200! dark:hover:bg-dark! transition-all duration-300"
        >
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium w-20">
            {index + 1}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-5 font-medium">
            {name}
          </TableCell>

          {(canUpdateDosage || canDeleteDosage) && (
            <TableCell className="text-center">
              <div className="flex justify-center items-center gap-2">
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
