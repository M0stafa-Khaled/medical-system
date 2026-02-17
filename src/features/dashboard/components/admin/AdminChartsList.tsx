import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import { RegistrationChart } from "./RegistrationChart";
import { BookingsChart } from "./BookingsChart";
import { TreasuriesChart } from "./TreasuriesChart";

const AdminChartsList = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="my-5 space-y-6"
    >
      <motion.div variants={itemVariants} className="col-span-2">
        <RegistrationChart />
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-2">
        <BookingsChart />
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-2">
        <TreasuriesChart />
      </motion.div>
    </motion.div>
  );
};

export default AdminChartsList;
