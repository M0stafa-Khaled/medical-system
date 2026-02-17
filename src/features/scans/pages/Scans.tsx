import SearchInput from "@/shared/components/ui/SearchInput";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ScansTable } from "../components/ScansTable";

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
        <div className="my-4">
          <SearchInput placeholder="ابحث عن أشعة" />
        </div>
        <ScansTable />
      </motion.section>
    </>
  );
};

export default Scans;
