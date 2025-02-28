import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import { Skeleton } from "./skeleton";
import { motion } from "framer-motion";
const CategoryCaredSkeleton = () => {
  return (
    <motion.div
      variants={containerVariants}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse"
    >
      {[...Array(6)].map((_, idx) => (
        <motion.div variants={itemVariants} custom={idx} key={idx}>
          <Skeleton className="h-[100px] bg-muted rounded-lg" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategoryCaredSkeleton;
