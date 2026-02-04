import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import ScansTable from "@/components/main/scans/ScansTable";

const Scans = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | الأشعات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <ScansTable />
      </motion.section>
    </>
  );
};

export default Scans;
