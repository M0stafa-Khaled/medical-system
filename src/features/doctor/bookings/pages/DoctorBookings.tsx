import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import { DoctorBookingsTable } from "../components/DoctorBookingsTable";
import { format } from "date-fns";
import SearchInput from "@/shared/components/ui/SearchInput";
import { ar } from "date-fns/locale";

const DoctorBookings = () => {
  const { clinicId } = useParams();

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
        <div className="mb-4 space-y-4">
          <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="text-lg font-semibold">
              {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
            </div>

            <SearchInput placeholder="ابحث باسم المريض" />
          </div>
        </div>
        <DoctorBookingsTable clinicId={clinicId} />
      </motion.section>
    </>
  );
};

export default DoctorBookings;
