import { TableCell } from "@/components/ui/table";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import { IBalance } from "@/interfaces/patientBalances";
import formatDateTime from "@/utils/formatDate";
import { numberToPrice } from "@/utils/numberToPrice";

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
        className="dark:border-muted bg-white/40! dark:bg-dark/40! hover:bg-gray-200! dark:hover:bg-dark! transition-all duration-300"
      >
        <TableCell
          colSpan={8}
          className="text-sm text-center text-black dark:text-white py-5 font-medium"
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
            className="dark:border-muted bg-white/40! dark:bg-dark/40! hover:bg-gray-200! dark:hover:bg-dark! transition-all duration-300"
          >
            <TableCell className="text-sm text-center text-black dark:text-white py-3 px-4 font-medium max-w-44 text-wrap">
              {transaction_code}
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44">
              {numberToPrice(amount_paid)}
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44">
              {numberToPrice(total_amount_due)}
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44">
              {numberToPrice(balance)}
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44">
              {numberToPrice(refund_amount)}
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44">
              {payment_method === "cash" ? "نقدي" : "بطاقة بنكية"}
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44">
              {payment_method === "visa" ? visa_code : "نقدي"}
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44">
              {formatDateTime(created_at)}
            </TableCell>
          </motion.tr>
        )
      )}
    </>
  );
};

export default PatientBalancesList;
