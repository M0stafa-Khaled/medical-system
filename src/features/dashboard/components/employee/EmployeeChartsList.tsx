import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import { EmployeeTreasuriesChart } from "./EmployeeTreasuriesChart";

export const EmployeeChartsList = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="my-5 space-y-6"
    >
      <motion.div variants={itemVariants} className="col-span-2">
        <EmployeeTreasuriesChart />
      </motion.div>
    </motion.div>
  );
};
