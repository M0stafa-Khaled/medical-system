import { DosagesTable } from "../components/DosagesTable";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { DosagesHeader } from "../components/DosagesHeader";

const Dosages = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | الجرعات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <DosagesHeader />
        <DosagesTable />
      </motion.section>
    </>
  );
};

export default Dosages;
