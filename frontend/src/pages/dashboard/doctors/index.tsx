import DoctorsTable from "@/components/dashboard/doctors/DoctorsTable";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Doctors = () => {
  return (
    <>
      <Helmet>
        <title>EgProg | الأطباء</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <DoctorsTable />
      </motion.section>
    </>
  );
};

export default Doctors;
