import { IClinic } from "@/interfaces/dashboard/clinics";
import { Badge } from "../ui/badge";
import { itemVariants } from "@/animations";
import { motion } from "framer-motion";

interface IProps {
  clinics: IClinic[];
}
const DoctorClinics = ({ clinics }: IProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-[#fff] dark:bg-dark rounded-2xl overflow-hidden shadow-md p-4"
    >
      <h3 className="text-center md:text-start text-lg font-medium">
        العيادات
      </h3>
      <div className="mt-4 md:pr-6 flex justify-center md:justify-start flex-wrap gap-x-1 gap-y-1">
        {clinics?.map((clinic) => (
          <motion.div key={clinic.id} variants={itemVariants}>
            <Badge className="py-1 px-8 text-sm">{clinic.name}</Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DoctorClinics;
