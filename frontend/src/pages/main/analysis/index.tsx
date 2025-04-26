import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import AnalysisTable from "@/components/main/analysis/AnalysisTable";

const Analysis = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | التحاليل</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <AnalysisTable />
      </motion.section>
    </>
  );
};

export default Analysis;
