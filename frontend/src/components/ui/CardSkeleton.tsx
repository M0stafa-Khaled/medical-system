import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import { Skeleton } from "./skeleton";
import { motion } from "framer-motion";
interface IProps {
  length?: number;
  mdLength?: number;
  lgLength?: number;
  count?: number;
  height?: string;
}
const CardSkeleton = ({
  length = 1,
  mdLength = 2,
  lgLength = 3,
  count = 6,
  height = "100px",
}: IProps) => {
  return (
    <motion.div
      key={"skeleton"}
      custom={"skeleton"}
      variants={containerVariants}
      className={`grid grid-cols-${length} md:grid-cols-${mdLength} lg:grid-cols-${lgLength} gap-4 animate-pulse`}
    >
      {Array.from({ length: count }, (_, idx) => (
        <motion.div
          key={idx}
          variants={itemVariants}
          custom={idx}
          className="h-auto"
        >
          <Skeleton className={`h-[${height}] bg-muted rounded-lg`} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CardSkeleton;
