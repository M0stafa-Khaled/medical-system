import { containerVariants, itemVariants } from "@/shared/animations";
import { Skeleton } from "./skeleton";
import { motion } from "framer-motion";
interface IProps {
  length?: number;
  mdLength?: number;
  lgLength?: number;
  count?: number;
}
export const CardSkeleton = ({
  length = 1,
  mdLength = 2,
  lgLength = 3,
  count = 6,
}: IProps) => {
  return (
    <motion.div
      key={"skeleton"}
      custom={"skeleton"}
      variants={containerVariants}
      className={`grid grid-cols-${length} md:grid-cols-${mdLength} lg:grid-cols-${lgLength} animate-pulse gap-4`}
    >
      {Array.from({ length: count }, (_, idx) => (
        <motion.div
          key={idx}
          variants={itemVariants}
          custom={idx}
          className="h-auto"
        >
          <Skeleton className={`bg-muted h-28 rounded-lg`} />
        </motion.div>
      ))}
    </motion.div>
  );
};
