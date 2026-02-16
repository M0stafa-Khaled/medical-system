import { DoctorsTable } from "../components/DoctorsTable";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { DoctorsHeader } from "../components/DoctorsHeader";

const Doctors = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | الأطباء</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <DoctorsHeader />
        <DoctorsTable />
      </motion.section>
    </>
  );
};

export default Doctors;
