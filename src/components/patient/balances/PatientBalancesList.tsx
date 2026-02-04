import { containerVariants, itemVariants } from "@/animations";
import { IBalance } from "@/interfaces/patientBalances";
import { motion } from "framer-motion";
import PatientBalanceCard from "./PatientBalanceCard";
interface IProps {
  balances: IBalance[];
}
const PatientBalancesList = ({ balances }: IProps) => {
  return (
    <>
      {!balances?.length ? (
        <h2 className="text-xl text-muted-foreground text-center font-medium my-8">
          لا يوجد مدفوعات سابقة
        </h2>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6 mt-8"
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
