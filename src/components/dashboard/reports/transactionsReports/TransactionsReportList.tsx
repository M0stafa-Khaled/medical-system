import { TableCell } from "@/shared/components/ui/table";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/shared/animations";
import truncateText from "@/shared/utils/truncateText";
import { ITransaction } from "@/features/dashboard/transactions/types";
import formatDateTime from "@/shared/utils/formatDate";
import { Badge } from "@/shared/components/ui/badge";
import { numberToPrice } from "@/shared/utils/numberToPrice";

interface IProps {
  transactions: ITransaction[];
}

const TransactionsReportList = ({ transactions }: IProps) => {
  if (!transactions.length)
    return (
      <motion.tr
        initial="hidden"
        animate="visible"
        variants={tableRowVariants}
        className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
      >
        <TableCell
          colSpan={9}
          className="py-5 text-center text-sm font-medium text-black dark:text-white"
        >
          لا يوجد ايرادات
        </TableCell>
      </motion.tr>
    );

  return (
    <>
      {transactions?.map((transaction, index) => (
        <motion.tr
          key={transaction?.id}
          initial="hidden"
          animate="visible"
          custom={index}
          variants={tableRowVariants}
          className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
        >
          <TableCell className="w-20 py-3 text-center text-sm font-medium text-black dark:text-white">
            {transaction?.code}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {numberToPrice(transaction.balance.amount_paid)}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {transaction.treasury.name}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {transaction.actions.map((action) => action.name).join(", ")}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {truncateText(transaction.employee.name, 15)}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {truncateText(transaction.patient.name, 15)}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {transaction.status ? (
              <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
                <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
                محصل
              </Badge>
            ) : (
              <Badge className="rounded-full bg-red-600/30 text-red-500 shadow-none hover:bg-red-600/10 dark:bg-red-600/20">
                <div className="ml-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                مسترد
              </Badge>
            )}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {formatDateTime(transaction?.created_at as string)}
          </TableCell>

          <TableCell className="text-center"></TableCell>
        </motion.tr>
      ))}
    </>
  );
};

export default TransactionsReportList;
