import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { BookingsReportHeader } from "../components/bookings/BookingsReportHeader";
import { BookingsReportTable } from "../components/bookings/BookingsReportTable";

const BookingsReports = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تقارير الحجوزات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <BookingsReportHeader />
        <BookingsReportTable />
      </motion.section>
    </>
  );
};

export default BookingsReports;
