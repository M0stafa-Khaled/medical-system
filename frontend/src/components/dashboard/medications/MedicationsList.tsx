import { tableRowVariants } from "@/animations/dashboardAnimations";
import { TableCell, TableRow } from "@/components/ui/table";
import { IMedication } from "@/interfaces/medications";
import { motion } from "framer-motion";

interface IProps {
  medications: IMedication[];
}

const MedicationsList = ({ medications }: IProps) => {
  if (!medications.length)
    return (
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
        <TableCell
          colSpan={7}
          className="text-sm text-center text-black dark:text-white py-5 font-medium"
        >
          لا يوجد أدوية
        </TableCell>
      </TableRow>
    );

  return (
    <>
      {medications.map(({ form, name }, idx) => (
        <motion.tr
          key={idx}
          initial="hidden"
          animate="visible"
          custom={idx}
          variants={tableRowVariants}
          className="dark:border-muted bg-white/20 dark:bg-dark/40 dark:hover:bg-dark transition-all duration-300"
        >
          <TableCell
            dir="ltr"
            className="text-sm text-center text-black dark:text-white py-5 font-medium"
          >
            {name}
          </TableCell>
          <TableCell
            dir="ltr"
            className="text-sm text-center text-black dark:text-white py-5 font-medium"
          >
            {form}
          </TableCell>
        </motion.tr>
      ))}
    </>
  );
};

export default MedicationsList;
