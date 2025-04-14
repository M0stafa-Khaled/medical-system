import { IPermission } from "@/interfaces/auth/auth";
import { Badge } from "../ui/badge";
import { itemVariants } from "@/animations";
import { motion } from "framer-motion";

interface IProps {
  permissions: IPermission[];
}
const EmployeePermissions = ({ permissions }: IProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-[#fff] dark:bg-dark rounded-2xl overflow-hidden shadow-md p-4"
    >
      <h3 className="text-center md:text-start text-lg font-medium">
        الصلاحيات
      </h3>
      <div className="mt-4 pr-6 flex justify-center md:justify-start flex-wrap gap-x-1 gap-y-1">
        {permissions?.map((perm) => (
          <motion.div key={perm.id} variants={itemVariants}>
            <Badge>{perm.name}</Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EmployeePermissions;
