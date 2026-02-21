import { containerVariants, itemVariants } from "@/shared/animations";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { motion } from "framer-motion";
import { DollarSign, Percent } from "lucide-react";
import { CreateDoctorExpense } from "./CreateDoctorExpense";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { DataTable } from "@/shared/components/data-table";
import { useDoctorTransactionsColumns } from "./DoctorTransactionsColumns";
import { useGetDoctorTransactions } from "../../queriesAndMutations";

export const DoctorTransactions = ({ doctorId }: { doctorId: string }) => {
  const { data: doctorTransactions, isLoading } = useGetDoctorTransactions({
    id: doctorId,
  });

  const columns = useDoctorTransactionsColumns();
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="border-muted mt-5">
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
              data={doctorTransactions?.data.items || []}
              columns={columns}
            />
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
};
