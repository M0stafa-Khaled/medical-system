import { TableCell } from "@/shared/components/ui/table";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import { IBalance } from "@/interfaces/patientBalances";
import formatDateTime from "@/shared/utils/formatDate";
import { numberToPrice } from "@/shared/utils/numberToPrice";

interface IProps {
  patients: IBalance[];
}

const PatientBalancesList = ({ patients }: IProps) => {
  if (!patients.length)
    return (
      <motion.tr
        initial="hidden"
        animate="visible"
        variants={tableRowVariants}
        className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
      >
        <TableCell
          colSpan={8}
          className="py-5 text-center text-sm font-medium text-black dark:text-white"
        >
          لا يوجد مرضى
        </TableCell>
      </motion.tr>
    );
  return (
    <>
      {patients.map(
        (
          {
            id,
            amount_paid,
            balance,
            created_at,
            payment_method,
            refund_amount,
            total_amount_due,
            transaction_code,
            visa_code,
          },
          index
        ) => (
          <motion.tr
            key={id}
            initial="hidden"
            animate="visible"
            custom={index}
            variants={tableRowVariants}
            className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
          >
            <TableCell className="max-w-44 px-4 py-3 text-center text-sm font-medium text-wrap text-black dark:text-white">
              {transaction_code}
            </TableCell>
            <TableCell className="max-w-44 py-3 text-center text-sm font-medium text-black dark:text-white">
              {numberToPrice(amount_paid)}
            </TableCell>
            <TableCell className="max-w-44 py-3 text-center text-sm font-medium text-black dark:text-white">
              {numberToPrice(total_amount_due)}
            </TableCell>
            <TableCell className="max-w-44 py-3 text-center text-sm font-medium text-black dark:text-white">
              {numberToPrice(balance)}
            </TableCell>
            <TableCell className="max-w-44 py-3 text-center text-sm font-medium text-black dark:text-white">
              {numberToPrice(refund_amount)}
            </TableCell>
            <TableCell className="max-w-44 py-3 text-center text-sm font-medium text-black dark:text-white">
              {payment_method === "cash" ? "نقدي" : "بطاقة بنكية"}
            </TableCell>
            <TableCell className="max-w-44 py-3 text-center text-sm font-medium text-black dark:text-white">
              {payment_method === "visa" ? visa_code : "نقدي"}
            </TableCell>
            <TableCell className="max-w-44 py-3 text-center text-sm font-medium text-black dark:text-white">
              {formatDateTime(created_at)}
            </TableCell>
          </motion.tr>
        )
      )}
    </>
  );
};

export default PatientBalancesList;
