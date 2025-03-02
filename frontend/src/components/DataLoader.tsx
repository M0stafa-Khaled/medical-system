import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";

const DataLoader = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div
        variants={itemVariants}
        className="my-20 text-black dark:text-white flex flex-col items-center justify-center gap-4"
      >
        <Loader2 className="animate-spin" size={48} />
        <p className="text-lg font-medium animate-pulse">
          جاري تحميل البيانات...
        </p>
      </motion.div>
    </motion.div>
  );
};

export default DataLoader;
