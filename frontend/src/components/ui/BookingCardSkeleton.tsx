import { containerVariants, itemVariants } from "@/animations";
import { motion } from "framer-motion";
import { Skeleton } from "./skeleton";

const BookingCardSkeleton = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
    >
      {Array.from({ length: 3 }, (_, idx) => (
        <motion.div key={idx} variants={itemVariants} custom={idx}>
          <Skeleton className="mx-auto h-96 w-full rounded-lg" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BookingCardSkeleton;
