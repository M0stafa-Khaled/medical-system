import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { DrugsTable } from "../components/DrugsTable";
import SearchInput from "@/shared/components/ui/SearchInput";

const Drugs = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | الأدوية</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="my-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl leading-relaxed font-semibold">الأدوية</h1>
          <SearchInput placeholder="ابحث عن دواء" />
        </div>
        <DrugsTable />
      </motion.section>
    </>
  );
};

export default Drugs;
