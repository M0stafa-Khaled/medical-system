import { containerVariants, itemVariants } from "@/animations";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDoctorClinics } from "@/lib/react-query/doctor/doctorClinics";
import cookieServices from "@/utils/cookieServices";
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {isLoading ? (
        Array.from({ length: 3 }, (_, idx) => (
          <motion.div variants={itemVariants} key={idx}>
            <Skeleton className="h-28 w-full" />
          </motion.div>
        ))
      ) : !clinics?.data.length ? (
        <p className="text-sm text-center text-black dark:text-white py-5 font-medium">
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
