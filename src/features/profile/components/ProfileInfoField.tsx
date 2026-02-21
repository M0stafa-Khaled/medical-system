import { itemVariants } from "@/shared/animations";
import { motion } from "framer-motion";
interface IProps {
  label: string;
  value: string;
  sm?: boolean;
}
export const ProfileInfoField = ({ label, value, sm }: IProps) => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center justify-center gap-x-2 gap-y-1 sm:flex-row md:justify-start"
    >
      <h5 className="text-muted-foreground font-medium text-nowrap">
        {label}:
      </h5>
      <p className={`text-lg font-medium text-wrap ${sm ? "text-sm" : ""}`}>
        {value || "لا يوجد"}
      </p>
    </motion.div>
  );
};
