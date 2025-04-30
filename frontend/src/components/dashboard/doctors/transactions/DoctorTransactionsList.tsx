import { TableCell } from "@/components/ui/table";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import truncateText from "@/utils/truncateText";
import { ITransaction } from "@/interfaces/dashboard/transactions/transactions";
import formatDateTime from "@/utils/formatDate";
import { Badge } from "@/components/ui/badge";

interface IProps {
  transactions: ITransaction[];
}

const DoctorTransactionsList = ({ transactions }: IProps) => {
  if (!transactions.length)
    return (
      <motion.tr
        initial="hidden"
        animate="visible"
        variants={tableRowVariants}
        className="dark:border-muted !bg-white/40 dark:!bg-dark/40 hover:!bg-gray-200 dark:hover:!bg-dark transition-all duration-300"
      >
        <TableCell
          colSpan={9}
          className="text-sm text-center text-black dark:text-white py-5 font-medium"
        >
          لا يوجد تحصيلات
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
          className="dark:border-muted !bg-white/40 dark:!bg-dark/40 hover:!bg-gray-200 dark:hover:!bg-dark transition-all duration-300"
        >
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium w-20">
            {transaction?.code}
          </TableCell>

          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {transaction.balance.amount_paid}
          </TableCell>

          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
            {transaction.treasury.name}
          </TableCell>

          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
            {transaction.actions.map((action) => action.name).join(", ")}
          </TableCell>

          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
            {truncateText(transaction.patient.name, 15)}
          </TableCell>

          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {transaction.status ? (
              <Badge className="bg-emerald-600/30 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-800 dark:text-emerald-500 shadow-none rounded-full">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500 ml-2" />
                محصل
              </Badge>
            ) : (
              <Badge className="bg-red-600/30 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 shadow-none rounded-full">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 ml-2" />
                مسترد
              </Badge>
            )}
          </TableCell>

          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
            {formatDateTime(transaction?.created_at as string)}
          </TableCell>
        </motion.tr>
      ))}
    </>
  );
};

export default DoctorTransactionsList;
