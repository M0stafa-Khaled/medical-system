import { tableRowVariants } from "@/animations/dashboardAnimations";
import { TableCell, TableRow } from "@/components/ui/table";
import { IPaginationMeta } from "@/interfaces";
import { IMedication } from "@/interfaces/dashboard/medication";
import countSerial from "@/utils/countSerial";
import { motion } from "framer-motion";

interface IProps {
  medications: IMedication[];
  meta?: IPaginationMeta;
}

const DrugsList = ({ medications, meta }: IProps) => {
  if (!medications.length)
    return (
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
        <TableCell
          colSpan={3}
          className="text-sm text-center text-black dark:text-white py-5 font-medium"
        >
          لا يوجد أدوية
        </TableCell>
      </TableRow>
    );

  return (
    <>
      {medications.map(({ form, name }, index) => (
        <motion.tr
          key={index}
          initial="hidden"
          animate="visible"
          custom={index}
          variants={tableRowVariants}
          className="dark:border-muted bg-white/20 dark:bg-dark/40 dark:hover:bg-dark transition-all duration-300"
        >
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium w-20">
            {countSerial({ meta: meta!, index })}
          </TableCell>
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

export default DrugsList;
