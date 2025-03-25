import { itemVariants } from "@/animations/dashboardAnimations";
import { motion } from "framer-motion";
interface IProps {
  label: string;
  value: string;
  sm?: boolean;
}
const ProfileInfoField = ({ label, value, sm }: IProps) => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-x-2 gap-y-1"
    >
      <h5 className="text-muted-foreground text-nowrap font-medium">
        {label}:
      </h5>
      <p className={`font-medium text-wrap text-lg ${sm ? "text-sm" : ""}`}>
        {value || "لا يوجد"}
      </p>
    </motion.div>
  );
};

export default ProfileInfoField;
