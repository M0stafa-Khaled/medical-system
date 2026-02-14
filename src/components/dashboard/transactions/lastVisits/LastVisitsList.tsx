import { TableCell } from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router";
import { FiEye } from "react-icons/fi";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { ITransaction } from "@/interfaces/dashboard/transactions/transactions";
import formatDateTime from "@/shared/utils/formatDate";
import { Badge } from "@/shared/components/ui/badge";
import RefundTransaction from "../RefundTransaction";
import { numberToPrice } from "@/shared/utils/numberToPrice";

interface IProps {
  transactions: ITransaction[];
}

const LastVisitsList = ({ transactions }: IProps) => {
  const canRefundTransaction = useHasPermission(PERMISSIONS.REFUND_TRANSACTION);
  const canViewTransaction = useHasPermission(PERMISSIONS.VIEW_TRANSACTION);

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
          className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
        >
          <TableCell className="w-20 py-3 text-center text-sm font-medium text-black dark:text-white">
            {transaction?.code}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {numberToPrice(transaction.balance.amount_paid)}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {transaction.actions.map((action) => action.name).join(", ")}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {transaction.balance.payment_method === "visa"
              ? "بطاقة بنكية"
              : "نقدي"}
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

          {(canRefundTransaction || canViewTransaction) && (
            <TableCell className="text-center">
              <div className="flex items-center justify-center gap-2">
                {canViewTransaction && (
                  <Button className="bg-primary h-auto gap-2 px-0 py-0 text-sm text-white dark:text-black">
                    <Link
                      to={`/dashboard/transactions/${transaction?.id}`}
                      className="flex h-9 w-9 items-center justify-center gap-2 px-1 py-1"
                    >
                      <FiEye size={24} />
                    </Link>
                  </Button>
                )}

                {canRefundTransaction && transaction.status && (
                  <RefundTransaction
                    code={transaction?.code}
                    id={transaction?.id}
                  />
                )}
              </div>
            </TableCell>
          )}
        </motion.tr>
      ))}
    </>
  );
};

export default LastVisitsList;
