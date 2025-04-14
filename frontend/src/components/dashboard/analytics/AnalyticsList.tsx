import { tableRowVariants } from "@/animations";
import { TableCell } from "@/components/ui/table";
import { IPaginationMeta } from "@/interfaces";
import { IAnalysis } from "@/interfaces/dashboard/analysis";
import countSerial from "@/utils/countSerial";
import { motion } from "framer-motion";

interface IProps {
  analytics: IAnalysis[];
  meta?: IPaginationMeta;
}

const AnalyticsList = ({ analytics, meta }: IProps) => {
  if (!analytics.length)
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
          className="dark:border-muted !bg-white/40 dark:!bg-dark/40 hover:!bg-gray-200 dark:hover:!bg-dark transition-all duration-300"
        >
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium w-20">
            {countSerial({ meta: meta!, index })}
          </TableCell>
          <TableCell
            dir="ltr"
            className="text-sm text-center text-black dark:text-white py-5 font-medium text-nowrap"
          >
            {name}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-5 font-medium text-nowrap">
            {arabic_name}
          </TableCell>
          <TableCell
            dir="ltr"
            className="text-sm text-center text-black dark:text-white py-5 font-medium text-nowrap"
          >
            {abbreviation}
          </TableCell>
        </motion.tr>
      ))}
    </>
  );
};

export default AnalyticsList;
