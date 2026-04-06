import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/shared/animations";
import { RegistrationChart } from "./RegistrationChart";
import { BookingsChart } from "./BookingsChart";
import { TreasuriesChart } from "./TreasuriesChart";

const AdminChartsList = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <RegistrationChart />
      </motion.div>
      <motion.div variants={itemVariants}>
        <BookingsChart />
      </motion.div>
      <motion.div variants={itemVariants}>
        <TreasuriesChart />
      </motion.div>
    </motion.div>
  );
};

export default AdminChartsList;
