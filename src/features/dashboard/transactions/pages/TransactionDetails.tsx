import InfoField from "@/shared/components/InfoField";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import formatDateTime from "@/shared/utils/formatDate";
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
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/shared/animations";
import DataLoader from "@/shared/components/ui/DataLoader";
import { Helmet } from "react-helmet-async";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { AxiosResErr } from "@/shared/types";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { RefundTransaction } from "../components/RefundTransaction";
import { useGetTransactionById } from "../queriesAndMutations";

const TransactionDetails = () => {
  const canRefundTransaction = useHasPermission(PERMISSIONS.REFUND_TRANSACTION);
  const navigate = useNavigate();

  const { transactionId } = useParams();

  const {
    data: transaction,
    isLoading,
    isError,
    failureReason,
  } = useGetTransactionById({
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
        <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-xs transition-shadow duration-300 hover:shadow-md">
          <CardHeader className="mb-4 py-4">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <CardTitle className="flex items-center gap-2">
                <Receipt className="text-primary h-6 w-6" />
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
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
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
                  label="الخزنة"
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
                  to={`/dashboard/doctors/${doctor?.item?.id}`}
                  className="hover:text-primary block transition-colors duration-200"
                >
                  <InfoField
                    label="الطبيب"
                    value={doctor?.item.name || ""}
                    icon={<Stethoscope className="h-5 w-5 text-indigo-500" />}
                  />
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center">
                <Link
                  to={`/dashboard/patients/${patient?.id}`}
                  className="hover:text-primary block transition-colors duration-200"
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
                  className="hover:text-primary block transition-colors duration-200"
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
