import { containerVariants, itemVariants } from "@/animations";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { motion } from "framer-motion";
import { DollarSign, Percent } from "lucide-react";
import { useGetDoctorTransactions } from "@/shared/lib/react-query/dashboard/doctors/doctorTransactions";
import cookieServices from "@/shared/utils/cookieServices";
import CreateDoctorExpense from "./CreateDoctorExpense";
import DataTable from "@/shared/components/ui/DataTable";
import DoctorTransactionsTableHeader from "./DoctorTransactionsTableHeader";
import DoctorTransactionsList from "./DoctorTransactionsList";
import { numberToPrice } from "@/shared/utils/numberToPrice";

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
      <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted my-2 shadow-xs">
        <CardHeader className="pb-2">
          <CardTitle>إيرادات الطبيب:</CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-3">
          <div className="flex flex-col gap-4">
            <motion.div variants={itemVariants}>
              <CreateDoctorExpense id={doctorId} />
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <Percent className="shrink-0 text-orange-500" />
              <div className="flex items-center gap-2">
                <h5 className="text-muted-foreground text-lg text-nowrap">
                  العمولة:
                </h5>
                <p className="text-dark text-lg font-medium text-wrap dark:text-white">
                  {doctorTransactions?.data.commission || "لا يوجد"}
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <DollarSign className="shrink-0 text-blue-600" />
              <div className="flex items-center gap-2">
                <h5 className="text-muted-foreground text-lg text-nowrap">
                  المبلع الإجمالي:
                </h5>
                <p className="text-dark text-lg font-medium text-wrap dark:text-white">
                  {numberToPrice(doctorTransactions?.data.total_amount ?? "") ||
                    0.0}
                </p>
              </div>
            </motion.div>
          </div>
          <div className="table-scrollbar mt-4">
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
