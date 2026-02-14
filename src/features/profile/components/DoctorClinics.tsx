import { Badge } from "@/shared/components/ui/badge";
import { itemVariants } from "@/animations";
import { IClinic } from "@/features/dashboard/clinics/types";
import { motion } from "framer-motion";

interface IProps {
  clinics: IClinic[];
}
export const DoctorClinics = ({ clinics }: IProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="dark:bg-dark overflow-hidden rounded-2xl bg-white p-4 shadow-md"
    >
      <h3 className="text-center text-lg font-medium md:text-start">
        العيادات
      </h3>
      <div className="mt-4 flex flex-wrap justify-center gap-x-1 gap-y-1 md:justify-start md:pr-6">
        {clinics?.map((clinic) => (
          <motion.div key={clinic.id} variants={itemVariants}>
            <Badge className="px-8 py-1 text-sm">{clinic.name}</Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
