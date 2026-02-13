import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useLocation } from "react-router";
import DoctorBookingsTable from "@/components/doctor/bookings/DoctorBookingsTable";

const DoctorBookings = () => {
  const location = useLocation();

  const clinicId = location.state?.clinicId;

  if (!clinicId) return null;

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | الحجوزات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <DoctorBookingsTable clinicId={clinicId} />
      </motion.section>
    </>
  );
};

export default DoctorBookings;
