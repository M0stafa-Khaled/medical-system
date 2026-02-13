import { containerVariants, itemVariants } from "@/animations";
import { IPrescriptable } from "@/interfaces/dashboard/prescription";
import { motion } from "framer-motion";
import PrescriptableCard from "./PrescriptableCard";

interface IProps {
  prescriptables: IPrescriptable[];
}
const PrescriptibleList = ({ prescriptables }: IProps) => {
  return (
    <motion.div
      variants={containerVariants}
      className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3"
    >
      {prescriptables.map((prescriptable, idx) => (
        <motion.div
          key={`${prescriptable.name}-${idx}`}
          variants={itemVariants}
          custom={idx}
        >
          <PrescriptableCard prescriptable={prescriptable} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PrescriptibleList;
