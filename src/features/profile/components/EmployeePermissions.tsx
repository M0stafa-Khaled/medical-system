import { Badge } from "../../../shared/components/ui/badge";
import { itemVariants } from "@/animations";
import { IPermission } from "@/features/auth/types";
import { motion } from "framer-motion";

interface IProps {
  permissions: IPermission[];
}
export const EmployeePermissions = ({ permissions }: IProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="dark:bg-dark overflow-hidden rounded-2xl bg-white p-4 shadow-md"
    >
      <h3 className="text-center text-lg font-medium md:text-start">
        الصلاحيات
      </h3>
      <div className="mt-4 flex flex-wrap justify-center gap-x-1 gap-y-1 pr-6 md:justify-start">
        {permissions?.map((perm) => (
          <motion.div key={perm.id} variants={itemVariants}>
            <Badge>{perm.name}</Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
