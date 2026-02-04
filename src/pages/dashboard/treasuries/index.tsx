import TreasuriesList from "@/components/dashboard/treasuries/TreasuriesList";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Treasuries = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | الخزائن</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <TreasuriesList />
      </motion.section>
    </>
  );
};

export default Treasuries;
