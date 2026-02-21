import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/shared/animations";

const DataLoader = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div
        variants={itemVariants}
        className="my-20 flex flex-col items-center justify-center gap-4 text-black dark:text-white"
      >
        <Loader2 className="animate-spin" size={48} />
        <p className="animate-pulse text-lg font-medium">
          جاري تحميل البيانات...
        </p>
      </motion.div>
    </motion.div>
  );
};

export default DataLoader;
