import { containerVariants, itemVariants } from "@/shared/animations";
import { motion } from "framer-motion";
import PatientBalanceCard from "./PatientBalanceCard";
import { IBalance } from "@/features/dashboard/transactions/types";
interface IProps {
  balances: IBalance[];
}
const PatientBalancesList = ({ balances }: IProps) => {
  return (
    <>
      {!balances?.length ? (
        <h2 className="text-muted-foreground my-8 text-center text-xl font-medium">
          لا يوجد مدفوعات سابقة
        </h2>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3"
        >
          {balances.map((balance, idx) => (
            <motion.div variants={itemVariants} key={balance.id} custom={idx}>
              <PatientBalanceCard balance={balance} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default PatientBalancesList;
