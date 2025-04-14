import { containerVariants, itemVariants } from "@/animations";
import { Skeleton } from "./skeleton";
import { motion } from "framer-motion";

const ActionSkeleton = ({ length = 3 }: { length?: number }) => {
  return (
    <motion.div
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4"
    >
      {Array.from({ length: length }, (_, idx) => (
        <motion.div key={idx} variants={itemVariants} custom={idx}>
          <Skeleton className="mx-auto h-24 w-full rounded-lg" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ActionSkeleton;
