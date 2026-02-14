import { tableRowVariants } from "@/animations";
import { TableCell } from "@/shared/components/ui/table";
import { IPaginationMeta } from "@/shared/types";
import { IDrug } from "@/interfaces/dashboard/drugs";
import countSerial from "@/shared/utils/countSerial";
import { motion } from "framer-motion";

interface IProps {
  drugs: IDrug[];
  meta?: IPaginationMeta;
}

const DrugsList = ({ drugs, meta }: IProps) => {
  if (!drugs.length)
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
          لا يوجد أدوية
        </TableCell>
      </motion.tr>
    );

  return (
    <>
      {drugs.map(({ form, name }, index) => (
        <motion.tr
          key={index}
          initial="hidden"
          animate="visible"
          custom={index}
          variants={tableRowVariants}
          className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
        >
          <TableCell className="w-20 py-3 text-center text-sm font-medium text-black dark:text-white">
            {countSerial({ meta: meta!, index })}
          </TableCell>
          <TableCell
            dir="ltr"
            className="py-5 text-center text-sm font-medium text-black dark:text-white"
          >
            {name}
          </TableCell>
          <TableCell
            dir="ltr"
            className="py-5 text-center text-sm font-medium text-black dark:text-white"
          >
            {form}
          </TableCell>
        </motion.tr>
      ))}
    </>
  );
};

export default DrugsList;
