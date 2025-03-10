import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import BookingsTable from "@/components/dashboard/booking/BookingsTable";

const Bookings = () => {
  return (
    <>
      <Helmet>
        <title>EgProg | الحجوزات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <BookingsTable />
      </motion.section>
    </>
  );
};

export default Bookings;
