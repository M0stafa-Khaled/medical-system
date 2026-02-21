import { containerVariants, itemVariants } from "@/shared/animations";
import { motion } from "framer-motion";
import { Skeleton } from "./skeleton";

const PCardSkeleton = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 3 }, (_, idx) => (
        <motion.div key={idx} variants={itemVariants} custom={idx}>
          <Skeleton className="mx-auto h-96 w-full rounded-lg" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PCardSkeleton;
