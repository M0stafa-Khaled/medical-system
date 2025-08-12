import InfoField from "@/components/shared/InfoField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import cookieServices from "@/utils/cookieServices";
import formatDateTime from "@/utils/formatDate";
import {
  DollarSign,
  User2,
  Calendar,
  Receipt,
  Wallet,
  BadgeCheck,
  BadgeX,
  CreditCard,
  Hash,
  FileText,
  PiggyBank,
  ClipboardList,
  Stethoscope,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import DataLoader from "@/components/ui/DataLoader";
import { Helmet } from "react-helmet-async";
import { useGetTransactionById } from "@/lib/react-query/dashboard/transactions/transactions";
import RefundTransaction from "@/components/dashboard/transactions/RefundTransaction";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { AxiosResErr } from "@/types";
import { numberToPrice } from "@/utils/numberToPrice";

const TransactionDetails = () => {
  const canRefundTransaction = useHasPermission(PERMISSIONS.REFUND_TRANSACTION);
  const navigate = useNavigate();

  const { transactionId } = useParams();

  const token = cookieServices.getToken()!;
  const {
    data: transaction,
    isLoading,
    isError,
    failureReason,
  } = useGetTransactionById({
    token,
    id: transactionId!,
  });

  const transactionFailure = failureReason as AxiosResErr;

  useEffect(() => {
    if (isError || transactionFailure?.response?.data.message) {
      toast.error(
        transactionFailure.response?.data.message ||
          "فشل في تحميل بيانات التحصيل"
      );
      navigate(-1);
      return;
    }
  }, [isError, navigate, transactionFailure]);

  if (isLoading) return <DataLoader />;

  const {
    actions,
    balance,
    code,
    created_at,
    doctor,
    employee,
    patient,
    refund_info,
    status,
    treasury,
    id,
  } = transaction?.data || {};

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME}</title>
      </Helmet>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="py-4 mb-4">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-6 w-6 text-primary" />
                <span>تفاصيل التحصيل:</span>
              </CardTitle>

              {canRefundTransaction && status && (
                <motion.div variants={itemVariants}>
                  <RefundTransaction code={code!} id={id!} />
                </motion.div>
              )}
            </motion.div>
          </CardHeader>

          <CardContent>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <InfoField
                  label="رقم الإيصال"
                  value={code!}
                  icon={<Hash className="h-5 w-5 text-purple-500" />}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="المبلغ المدفوع"
                  value={numberToPrice(balance?.amount_paid as string)}
                  icon={<DollarSign className="h-5 w-5 text-green-500" />}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="المبلغ الفعلي"
                  value={numberToPrice(balance?.total_amount_due as string)}
                  icon={<PiggyBank className="h-5 w-5 text-red-500" />}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="المبلغ المستحق"
                  value={numberToPrice(balance?.balance as string)}
                  icon={<PiggyBank className="h-5 w-5 text-red-500" />}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="وسيلة الدفع"
                  value={
                    balance?.payment_method === "cash" ? "نقدي" : "بطاقة بنكية"
                  }
                  icon={<CreditCard className="h-5 w-5 text-blue-500" />}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="نوع التحصيل"
                  value={balance?.type === "inquiry" ? "كشف" : "دفعة"}
                  icon={<FileText className="h-5 w-5 text-amber-500" />}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="الخدمة"
                  value={
                    actions?.map((action) => action.name).join(", ") as string
                  }
                  icon={<ClipboardList className="h-5 w-5 text-cyan-500" />}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="الخزينة"
                  value={treasury?.name ?? "لا يوجد"}
                  icon={<Wallet className="h-5 w-5 text-yellow-500" />}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="الحالة"
                  value={status ? "محصل" : "مسترد"}
                  icon={
                    status ? (
                      <BadgeCheck className="text-green-500" />
                    ) : (
                      <BadgeX className="text-red-500" />
                    )
                  }
                />
              </motion.div>

              {!status && (
                <motion.div variants={itemVariants}>
                  <InfoField
                    label="المبلغ المسترد"
                    value={numberToPrice(balance?.refund_amount as string)}
                    icon={<BadgeX className="text-red-500" />}
                  />
                </motion.div>
              )}

              {!status && refund_info && (
                <motion.div variants={itemVariants}>
                  <InfoField
                    label="سبب الاسترداد"
                    value={refund_info}
                    icon={<BadgeX className="text-red-500" />}
                  />
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="flex items-center">
                <Link
                  to={`/dashboard/doctors/${doctor?.id}`}
                  className="block hover:text-primary transition-colors duration-200"
                >
                  <InfoField
                    label="الطبيب"
                    value={doctor?.name || ""}
                    icon={<Stethoscope className="h-5 w-5 text-indigo-500" />}
                  />
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center">
                <Link
                  to={`/dashboard/patients/${patient?.id}`}
                  className="block hover:text-primary transition-colors duration-200"
                >
                  <InfoField
                    label="المريض"
                    value={patient?.name || ""}
                    icon={<User2 className="h-5 w-5 text-indigo-500" />}
                  />
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center">
                <Link
                  to={`/dashboard/employees/${employee?.id}`}
                  className="block hover:text-primary transition-colors duration-200"
                >
                  <InfoField
                    label="الموظف"
                    value={employee?.name || ""}
                    icon={<User2 className="h-5 w-5 text-indigo-500" />}
                  />
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="تاريخ التحصيل"
                  value={formatDateTime(created_at!, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                  icon={<Calendar className="h-5 w-5 text-orange-500" />}
                  sm
                />
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default TransactionDetails;
