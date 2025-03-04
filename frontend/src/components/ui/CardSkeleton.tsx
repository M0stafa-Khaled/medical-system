import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import { Skeleton } from "./skeleton";
import { motion } from "framer-motion";
const CardSkeleton = () => {
  return (
    <motion.div
      key={"skeleton"}
      custom={"skeleton"}
      variants={containerVariants}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse"
    >
      {[...Array(6)].map((_, idx) => (
        <motion.div key={idx} variants={itemVariants} custom={idx}>
          <Skeleton className="h-[100px] bg-muted rounded-lg" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CardSkeleton;
