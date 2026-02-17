import { containerVariants } from "@/animations";
import { Card, CardHeader } from "@/shared/components/ui/card";
import DataLoader from "@/shared/components/ui/DataLoader";
import { useGetPatientBalances } from "@/shared/lib/react-query/dashboard/transactions/patientBalances";
import cookieServices from "@/shared/utils/cookieServices";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { PatientBalancesTable } from "./PatientBalancesTable";

interface IProps {
  patientId: string;
}
export const PatientBalances = ({ patientId }: IProps) => {
  const token = cookieServices.getToken()!;

  const {
    data: patientBalances,
    isLoading,
    isError,
  } = useGetPatientBalances({
    patientId,
    token,
  });

  useEffect(() => {
    if (patientBalances?.message && !patientBalances.status)
      toast.error(patientBalances.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [patientBalances?.message, isError, patientBalances?.status]);

  if (isLoading) return <DataLoader />;

  const { refund_amount, total_amount_due, total_amount_paid, total_balance } =
    patientBalances?.data || {};
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="border-muted">
        <CardHeader className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
          <div className="flex items-center gap-2 font-semibold">
            <h4 className="text-dark dark:text-white">المبلغ المستحق:</h4>
            <p>{numberToPrice(total_amount_due!)}</p>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <h4 className="text-dark dark:text-white">إجمالي المدفوع:</h4>
            <p>{numberToPrice(total_amount_paid!)}</p>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <h4 className="text-dark dark:text-white">إجمالي المبالغ:</h4>
            <p>{numberToPrice(total_balance!)}</p>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <h4 className="text-dark dark:text-white">إجمالي المسترد:</h4>
            <p>{numberToPrice(refund_amount!)}</p>
          </div>
        </CardHeader>
      </Card>
      <div className="mt-2 rounded-md">
        <PatientBalancesTable
          patientBalances={patientBalances?.data.items || []}
        />
      </div>
    </motion.section>
  );
};
