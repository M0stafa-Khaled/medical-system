import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/shared/animations";
import { EmployeeTreasuriesChart } from "./EmployeeTreasuriesChart";

export const EmployeeChartsList = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <EmployeeTreasuriesChart />
      </motion.div>
    </motion.div>
  );
};
