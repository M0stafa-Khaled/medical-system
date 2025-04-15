import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import PatientBalancesHeader from "@/components/patient/balances/PatientBalancesHeader";
import PatientBalancesList from "@/components/patient/balances/PatientBalancesList";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useGetPatientTransactionsBalances } from "@/lib/react-query/patient/patientBalances";
import cookieServices from "@/utils/cookieServices";
import PCardSkeleton from "@/components/ui/PCardSkeleton";

const PatientBalances = () => {
  const token = cookieServices.getToken()!;
  const {
    data: balances,
    isLoading,
    isError,
  } = useGetPatientTransactionsBalances(token);
  const { refund_amount, total_amount_due, total_amount_paid, total_balance } =
    balances?.data || {};
  useEffect(() => {
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [balances?.status, isError]);

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | المدفوعات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="xl:container mt-10"
      >
        <PatientBalancesHeader
          refund_amount={refund_amount!}
          total_amount_due={total_amount_due!}
          total_amount_paid={total_amount_paid!}
          total_balance={total_balance!}
        />
        {isLoading ? (
          <PCardSkeleton />
        ) : (
          <PatientBalancesList balances={balances?.data.items || []} />
        )}
      </motion.section>
    </>
  );
};

export default PatientBalances;
