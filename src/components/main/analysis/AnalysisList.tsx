import { tableRowVariants } from "@/animations";
import { TableCell } from "@/shared/components/ui/table";
import { IPaginationMeta } from "@/shared/types";
import { IAnalysis } from "@/interfaces/dashboard/analysis";
import countSerial from "@/shared/utils/countSerial";
import { motion } from "framer-motion";

interface IProps {
  analytics: IAnalysis[];
  meta?: IPaginationMeta;
}

const AnalysisList = ({ analytics, meta }: IProps) => {
  if (!analytics.length)
    return (
      <motion.tr
        initial="hidden"
        animate="visible"
        variants={tableRowVariants}
        className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
      >
        <TableCell
          colSpan={4}
          className="py-5 text-center text-sm font-medium text-black dark:text-white"
        >
          لا يوجد تحاليل
        </TableCell>
      </motion.tr>
    );

  return (
    <>
      {analytics.map(({ name, arabic_name, abbreviation }, index) => (
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
            className="py-5 text-center text-sm font-medium text-nowrap text-black dark:text-white"
          >
            {name}
          </TableCell>
          <TableCell className="py-5 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {arabic_name}
          </TableCell>
          <TableCell
            dir="ltr"
            className="py-5 text-center text-sm font-medium text-nowrap text-black dark:text-white"
          >
            {abbreviation}
          </TableCell>
        </motion.tr>
      ))}
    </>
  );
};

export default AnalysisList;
