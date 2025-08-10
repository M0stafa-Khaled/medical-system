import { TableCell } from "@/components/ui/table";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import formatDateTime from "@/utils/formatDate";
import { ITransfer } from "@/interfaces/dashboard/reports";
import { numberToPrice } from "@/utils/numberToPrice";

interface IProps {
  transfers: ITransfer[];
}

const TransfersReportList = ({ transfers }: IProps) => {
  if (!transfers.length)
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
          لا يوجد تحويلات
        </TableCell>
      </motion.tr>
    );

  return (
    <>
      {transfers?.map((transfer, index) => (
        <motion.tr
          key={transfer?.id}
          initial="hidden"
          animate="visible"
          custom={index}
          variants={tableRowVariants}
          className="dark:border-muted !bg-white/40 dark:!bg-dark/40 hover:!bg-gray-200 dark:hover:!bg-dark transition-all duration-300 [&>*]:whitespace-nowrap"
        >
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {transfer?.from_treasury.name}
          </TableCell>

          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {transfer.to_treasury.name}
          </TableCell>

          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {numberToPrice(transfer.amount)}
          </TableCell>

          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {formatDateTime(transfer?.created_at as string)}
          </TableCell>
        </motion.tr>
      ))}
    </>
  );
};

export default TransfersReportList;
