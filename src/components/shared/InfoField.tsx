import { itemVariants } from "@/animations";
import { ReactNode } from "react";
import { motion } from "framer-motion";
interface IProps {
  label: string;
  value: string | number;
  sm?: boolean;
  icon?: ReactNode;
  breakAll?: boolean;
}

const InfoField = ({ label, value, sm, icon, breakAll }: IProps) => {
  return (
    <motion.div variants={itemVariants} className="flex items-center gap-4">
      {icon && <div className="shrink-0">{icon}</div>}
      <div className="flex items-center gap-2">
        <h5 className="text-muted-foreground text-nowrap">{label}:</h5>
        <p
          className={`font-medium text-wrap text-dark dark:text-white ${
            sm && "text-sm"
          } ${breakAll && "break-all"}`}
        >
          {value ? value : typeof value === "number" ? 0.0 : "لا يوجد"}
        </p>
      </div>
    </motion.div>
  );
};

export default InfoField;
