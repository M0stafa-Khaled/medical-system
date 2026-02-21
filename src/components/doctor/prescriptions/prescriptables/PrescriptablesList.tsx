import { containerVariants, itemVariants } from "@/shared/animations";
import { IPrescriptable } from "@/features/dashboard/prescriptions/types";
import { motion } from "framer-motion";
import PrescriptableCard from "./PrescriptableCard";

interface IProps {
  prescriptables: IPrescriptable[];
}
const PrescriptablesList = ({ prescriptables }: IProps) => {
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

export default PrescriptablesList;
