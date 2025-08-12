import { containerVariants, itemVariants } from "@/animations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { DollarSign, Percent } from "lucide-react";
import { useGetDoctorTransactions } from "@/lib/react-query/dashboard/doctors/doctorTransactions";
import cookieServices from "@/utils/cookieServices";
import CreateDoctorExpense from "./CreateDoctorExpense";
import DataTable from "@/components/ui/DataTable";
import DoctorTransactionsTableHeader from "./DoctorTransactionsTableHeader";
import DoctorTransactionsList from "./DoctorTransactionsList";
import { numberToPrice } from "@/utils/numberToPrice";

const DoctorTransactions = ({ doctorId }: { doctorId: string }) => {
  const token = cookieServices.getToken()!;
  const { data: doctorTransactions, isLoading } = useGetDoctorTransactions({
    token,
    id: doctorId,
  });
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-sm my-2">
        <CardHeader className="pb-2">
          <CardTitle>إيرادات الطبيب:</CardTitle>
        </CardHeader>
        <CardContent className="py-3 px-4">
          <div className="flex flex-col gap-4">
            <motion.div variants={itemVariants}>
              <CreateDoctorExpense id={doctorId} />
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <Percent className="text-orange-500 flex-shrink-0" />
              <div className="flex items-center gap-2">
                <h5 className="text-muted-foreground text-nowrap text-lg">
                  العمولة:
                </h5>
                <p className="font-medium text-wrap text-dark dark:text-white text-lg">
                  {doctorTransactions?.data.commission || "لا يوجد"}
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <DollarSign className="text-blue-600 flex-shrink-0" />
              <div className="flex items-center gap-2">
                <h5 className="text-muted-foreground text-nowrap text-lg">
                  المبلع الإجمالي:
                </h5>
                <p className="font-medium text-wrap text-dark dark:text-white text-lg">
                  {numberToPrice(doctorTransactions?.data.total_amount ?? "") || 0.0}
                </p>
              </div>
            </motion.div>
          </div>
          <div className="mt-4 table-scrollbar">
            <DataTable
              isLoading={isLoading}
              tableHeader={<DoctorTransactionsTableHeader />}
              list={
                <DoctorTransactionsList
                  transactions={doctorTransactions?.data.items || []}
                />
              }
            />
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default DoctorTransactions;
