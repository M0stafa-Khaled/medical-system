import { TableCell } from "@/shared/components/ui/table";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/shared/animations";
import formatDateTime from "@/shared/utils/formatDate";
import { ITransfer } from "@/interfaces/dashboard/reports";
import { numberToPrice } from "@/shared/utils/numberToPrice";

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
        className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
      >
        <TableCell
          colSpan={4}
          className="py-5 text-center text-sm font-medium text-black dark:text-white"
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
          className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 *:whitespace-nowrap hover:bg-gray-200!"
        >
          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {transfer?.from_treasury.name}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {transfer.to_treasury.name}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {numberToPrice(transfer.amount)}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {formatDateTime(transfer?.created_at as string)}
          </TableCell>
        </motion.tr>
      ))}
    </>
  );
};

export default TransfersReportList;
