import DoctorClinicsList from "@/components/doctor/clinics/DoctorClinicsList";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const DoctorClinics = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | الحجوزات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-dark text-lg font-semibold lg:text-xl dark:text-white">
          عياداتى
        </h1>
        <div className="mt-5">
          <DoctorClinicsList />
        </div>
      </motion.section>
    </>
  );
};

export default DoctorClinics;
