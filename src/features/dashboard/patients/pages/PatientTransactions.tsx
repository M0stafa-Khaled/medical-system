import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { containerVariants } from "@/shared/animations";
import {
  User,
  Receipt,
  Info,
  DollarSign,
  CreditCard,
  RefreshCcw,
  Loader2,
} from "lucide-react";
import { useGetPatientBalances } from "../balances/queriesAndMutations";
import InputFilter from "@/shared/components/ui/input-filter";
import SelectFilter from "@/shared/components/ui/select-filter";
import { useSearchParams } from "react-router";
import { useGetAllPatients } from "../queriesAndMutations";
import useDebounce from "@/shared/hooks/useDebounce";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { PatientBalancesTable } from "../balances/components/PatientBalancesTable";

const PatientTransactions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [patientSearch, setPatientSearch] = useState<string>("");
  const debouncedSearch = useDebounce(patientSearch, 400);

  const { data: patients } = useGetAllPatients({
    page: 1,
    search: debouncedSearch,
  });

  const handlePatientChange = (patientId: string) => {
    const params = new URLSearchParams(searchParams);
    if (patientId) {
      params.set("patient_id", patientId);
    } else {
      params.delete("patient_id");
    }
    setSearchParams(params);
  };

  const selectedPatientId = searchParams.get("patient_id") || "";

  const { data: patientBalances, isLoading } = useGetPatientBalances({
    patientId: selectedPatientId,
  });

  const transactions = patientBalances?.data?.items || [];
  const { total_amount_due, total_amount_paid, refund_amount, total_balance } =
    patientBalances?.data || {};

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | كشف حسابات المرضي</title>
      </Helmet>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="flex flex-col gap-2">
          <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-orange-500 to-orange-600 shadow-lg">
              <Receipt className="h-5 w-5 text-white" />
            </div>
            كشف حسابات المرضى
          </h1>
          <p className="text-muted-foreground">
            إدارة وعرض حسابات ومستحقات المرضى
          </p>
        </div>

        {/* Patient Selector Card */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-orange-600" />
              اختيار المريض
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            <InputFilter
              placeholder="ابحث باسم المريض"
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
            />

            <SelectFilter
              placeholder="اختر المريض"
              handleFilterChange={(_, value) =>
                handlePatientChange(value || "")
              }
              value={selectedPatientId}
              filterKey="patient_id"
              options={[
                ...(patients?.data?.items?.length
                  ? patients.data.items.map((p) => ({
                      value: String(p.id),
                      label: p.name,
                    }))
                  : []),
              ]}
            />
          </CardContent>
        </Card>

        {selectedPatientId ? (
          isLoading ? (
            <div className="my-5 flex items-center justify-center">
              <Loader2 className="text-primary h-10 w-10 animate-spin" />
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <motion.div
                  variants={containerVariants}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0 }}
                >
                  <Card className="overflow-hidden border-0 bg-red-50 dark:bg-red-950/30">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <p className="text-muted-foreground text-sm font-medium">
                            المستحق
                          </p>
                          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                            {numberToPrice(total_amount_due || 0)}
                          </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-red-500 to-red-600 shadow-lg">
                          <CreditCard className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="overflow-hidden border-0 bg-emerald-50 dark:bg-emerald-950/30">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <p className="text-muted-foreground text-sm font-medium">
                            المدفوع
                          </p>
                          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {numberToPrice(total_amount_paid || 0)}
                          </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 shadow-lg">
                          <DollarSign className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="overflow-hidden border-0 bg-blue-50 dark:bg-blue-950/30">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <p className="text-muted-foreground text-sm font-medium">
                            الإجمالي
                          </p>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {numberToPrice(total_balance || 0)}
                          </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-blue-600 shadow-lg">
                          <Receipt className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="overflow-hidden border-0 bg-amber-50 dark:bg-amber-950/30">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <p className="text-muted-foreground text-sm font-medium">
                            المسترد
                          </p>
                          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                            {numberToPrice(refund_amount || 0)}
                          </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-amber-500 to-amber-600 shadow-lg">
                          <RefreshCcw className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Transactions Table */}
              <Card className="border-border/50 overflow-hidden shadow-sm">
                <CardHeader className="bg-muted/30 border-b pb-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-lg">سجل المدفوعات</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="table-scrollbar">
                    <PatientBalancesTable patientBalances={transactions} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-muted/30 border-2 border-dashed">
              <CardContent className="flex items-center gap-4 py-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                  <Info className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <p className="text-muted-foreground text-lg">
                  الرجاء اختيار مريض من القائمة أعلاه لعرض حساباته ومستحقاتاته
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.section>
    </>
  );
};

export default PatientTransactions;
