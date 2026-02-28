import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/shared/animations";
import DoctorBookingsCharts from "./DoctorBookingsCharts";
import DoctorPrescriptionsCharts from "./DoctorPrescriptionsCharts";
import DoctorTransactionsCharts from "./DoctorTransactionsCharts";

const DoctorChartsList = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="my-5 space-y-6"
    >
      <motion.div variants={itemVariants} className="col-span-2">
        <DoctorBookingsCharts />
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-2">
        <DoctorPrescriptionsCharts />
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-2">
        <DoctorTransactionsCharts />
      </motion.div>
    </motion.div>
  );
};

export default DoctorChartsList;
