import { containerVariants } from "@/animations/dashboardAnimations";
import { Card, CardHeader } from "@/components/ui/card";
import DataLoader from "@/components/ui/DataLoader";
import { useGetPatientBalances } from "@/lib/react-query/dashboard/transactions/patientBalances";
import cookieServices from "@/utils/cookieServices";
import { motion } from "framer-motion";
import PatientBalancesTable from "./PatientBalancesTable";

interface IProps {
  patientId: string;
}
const PatientBalances = ({ patientId }: IProps) => {
  const token = cookieServices.getToken()!;
  const { data: patientBalances, isLoading } = useGetPatientBalances({
    patientId,
    token,
  });

  if (isLoading) return <DataLoader />;

  const { refund_amount, total_amount_due, total_amount_paid, total_balance } =
    patientBalances?.data || {};
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-sm">
        <CardHeader className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <h4 className="text-dark dark:text-white">الإجمالي:</h4>
            <p>{total_amount_due}</p>
          </div>
          <div className="flex items-center gap-2 font-semibold text-lg">
            <h4 className="text-dark dark:text-white">إجمالي المدفوع:</h4>
            <p>{total_amount_paid}</p>
          </div>
          <div className="flex items-center gap-2 font-semibold text-lg">
            <h4 className="text-dark dark:text-white">إجمالي المستحق:</h4>
            <p>{total_balance}</p>
          </div>
          <div className="flex items-center gap-2 font-semibold text-lg">
            <h4 className="text-dark dark:text-white">إجمالي المسترد:</h4>
            <p>{refund_amount}</p>
          </div>
        </CardHeader>
      </Card>
      <div className="rounded-md mt-2">
        <PatientBalancesTable
          patientBalances={patientBalances?.data.items || []}
        />
      </div>
    </motion.section>
  );
};

export default PatientBalances;
