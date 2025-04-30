import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import DoctorBookingsTable from "@/components/doctor/bookings/DoctorBookingsTable";

const DoctorBookings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [clinicId, setClinicId] = useState<number | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      const id = location.state?.clinicId;
      if (!id) {
        navigate("/doctor");
        return;
      }
      setClinicId(id);
      initialized.current = true;
    }
  }, [location.state, navigate]);

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
