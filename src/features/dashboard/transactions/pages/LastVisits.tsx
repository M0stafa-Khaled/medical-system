import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { LastVisitsHeader } from "../components/lastVisits/LastVisitsHeader";
import { LastVisitsTable } from "../components/lastVisits/LastVisitsTable";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useGetPatientLastVisits } from "../queriesAndMutations";
import { useParams } from "react-router";
import DataLoader from "@/shared/components/ui/DataLoader";

const LastVisits = () => {
  const { doctorId, patientId } = useParams();

  const {
    data: transactions,
    isLoading,
    isError,
  } = useGetPatientLastVisits({
    doctorId: doctorId!,
    patientId: patientId!,
  });

  useEffect(() => {
    if (transactions?.message && !transactions.status)
      toast.error(transactions.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [transactions?.message, isError, transactions?.status]);

  if (isLoading) return <DataLoader />;

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
        <LastVisitsHeader name={transactions?.data[0].patient.name || ""} />
        <LastVisitsTable
          transactions={transactions?.data || []}
          isLoading={isLoading}
        />
      </motion.section>
    </>
  );
};

export default LastVisits;
