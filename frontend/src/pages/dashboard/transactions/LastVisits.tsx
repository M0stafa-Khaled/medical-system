import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import LastVisitsTable from "@/components/dashboard/transactions/lastVisits/LastVisitsTable";

const LastVisits = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | اخر الزيارات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <LastVisitsTable />
      </motion.section>
    </>
  );
};

export default LastVisits;
