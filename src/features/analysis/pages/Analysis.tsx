import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { AnalysisTable } from "../components/AnalysisTable";
import SearchInput from "@/shared/components/ui/SearchInput";

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
        <div className="my-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl leading-relaxed font-semibold">التحاليل</h1>
          <SearchInput placeholder="ابحث عن تحليل" />
        </div>
        <AnalysisTable />
      </motion.section>
    </>
  );
};

export default Analysis;
