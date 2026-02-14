import { containerVariants, itemVariants } from "@/animations";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useGetDoctorClinics } from "@/shared/lib/react-query/doctor/doctorClinics";
import cookieServices from "@/shared/utils/cookieServices";
import { motion } from "framer-motion";
import ClinicCard from "./ClinicCard";

const DoctorClinicsList = () => {
  const token = cookieServices.getToken()!;
  const { data: clinics, isLoading } = useGetDoctorClinics(token);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      {isLoading ? (
        Array.from({ length: 3 }, (_, idx) => (
          <motion.div variants={itemVariants} key={idx}>
            <Skeleton className="h-28 w-full" />
          </motion.div>
        ))
      ) : !clinics?.data.length ? (
        <p className="py-5 text-center text-sm font-medium text-black dark:text-white">
          لا يوجد لديك عيادات
        </p>
      ) : (
        clinics?.data.map((clinic) => (
          <motion.div variants={itemVariants} key={clinic.id}>
            <ClinicCard clinic={clinic} />
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default DoctorClinicsList;
