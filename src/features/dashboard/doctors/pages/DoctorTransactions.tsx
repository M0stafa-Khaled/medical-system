import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { DataTable } from "@/shared/components/data-table";
import { containerVariants } from "@/shared/animations";
import { User, Receipt, Info } from "lucide-react";
import InputFilter from "@/shared/components/ui/input-filter";
import SelectFilter from "@/shared/components/ui/select-filter";
import { useSearchParams } from "react-router";
import {
  useGetAllDoctors,
  useGetDoctorTransactions,
} from "../queriesAndMutations";
import useDebounce from "@/shared/hooks/useDebounce";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { useDoctorTransactionsColumns } from "../components/transactions/DoctorTransactionsColumns";
import { DoctorTransactionsStats } from "../components/transactions/DoctorTransactionsStats";
import { CreateDoctorExpense } from "../components/transactions/CreateDoctorExpense";

const DoctorTransactions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctorSearch, setDoctorSearch] = useState<string>();
  const debouncedSearch = useDebounce(doctorSearch, 400);

  const { data: doctors } = useGetAllDoctors({ search: debouncedSearch });

  const handleDoctorChange = (doctorId: string) => {
    const params = new URLSearchParams(searchParams);
    if (doctorId) {
      params.set("doctor_id", doctorId);
    } else {
      params.delete("doctor_id");
    }
    setSearchParams(params);
  };
  const selectedDoctorId = searchParams.get("doctor_id") || "";

  const { data: doctorTransactions, isLoading } = useGetDoctorTransactions({
    id: selectedDoctorId,
  });

  const columns = useDoctorTransactionsColumns();

  const transactions = doctorTransactions?.data.items || [];
  const commission = doctorTransactions?.data.commission;
  const totalAmount = doctorTransactions?.data.total_amount;

  const canAddDoctorTransaction = useHasPermission(
    PERMISSIONS.ADD_DOCTOR_EXPENSE
  );
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | معاملات الأطباء</title>
      </Helmet>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="flex flex-col gap-2">
          <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20">
              <Receipt className="h-6 w-6 text-white" />
            </div>
            معاملات الأطباء
          </h1>
          <p className="text-muted-foreground">
            إدارة وعرض معاملات ومستحقات الأطباء
          </p>
        </div>

        {/* Doctor Selector Card */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-blue-600" />
              اختيار الطبيب
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            <InputFilter
              placeholder="ابحث باسم الطبيب"
              value={doctorSearch}
              onChange={(e) => setDoctorSearch(e.target.value)}
            />

            <SelectFilter
              placeholder="اختر الطبيب"
              handleFilterChange={(_, value) => handleDoctorChange(value || "")}
              value={selectedDoctorId}
              filterKey="doctor_id"
              options={[
                ...(doctors?.data.items?.length
                  ? doctors.data.items.map((p) => ({
                      value: String(p.id),
                      label: p.name,
                    }))
                  : []),
              ]}
            />
          </CardContent>
        </Card>

        {selectedDoctorId ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            <DoctorTransactionsStats
              commission={commission}
              totalAmount={totalAmount}
            />

            <Card className="border-border/50 overflow-hidden shadow-sm">
              <CardHeader className="bg-muted/30 border-b pb-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="text-lg">سجل المعاملات</CardTitle>
                  {canAddDoctorTransaction && (
                    <CreateDoctorExpense id={selectedDoctorId} />
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="table-scrollbar">
                  <DataTable
                    isLoading={isLoading}
                    data={transactions}
                    columns={columns}
                    emptyMessage="لا توجد معاملات لهذا الطبيب"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-muted/30 border-2 border-dashed">
              <CardContent className="flex items-center gap-4 py-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-muted-foreground text-lg">
                  الرجاء اختيار طبيب من القائمة أعلاه لعرض معاملاته والمستحقات
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.section>
    </>
  );
};

export default DoctorTransactions;
