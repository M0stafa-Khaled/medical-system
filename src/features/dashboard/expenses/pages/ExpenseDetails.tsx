import InfoField from "@/components/shared/InfoField";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import formatDateTime from "@/shared/utils/formatDate";
import {
  DollarSign,
  Tag,
  User2,
  Calendar,
  Receipt,
  Wallet,
  BadgeCheck,
  BadgeX,
  Hash,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import DataLoader from "@/shared/components/ui/DataLoader";
import { Helmet } from "react-helmet-async";
import { useGetExpenseById } from "@/features/dashboard/expenses/queriesAndMutations";
import { AxiosResErr } from "@/shared/types";

const ExpenseDetails = () => {
  const navigate = useNavigate();
  const { expenseId } = useParams();
  const {
    data: expense,
    isLoading,
    isError,
    failureReason,
  } = useGetExpenseById({
    id: expenseId!,
  });

  const expenseFailure = failureReason as AxiosResErr;

  useEffect(() => {
    if (isError || expenseFailure?.response?.data.message) {
      toast.error(
        expenseFailure.response?.data.message || "فشل في تحميل بيانات المصروف"
      );
      navigate(-1);
      return;
    }
  }, [isError, navigate, expenseFailure]);

  if (isLoading) return <DataLoader />;

  const {
    name,
    cancelled_info,
    category,
    code,
    created_at,
    employee,
    price,
    status,
    treasury,
  } = expense?.data || {};

  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_WEB_NAME} | {name || " "}
        </title>
      </Helmet>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-xs transition-shadow duration-300 hover:shadow-md">
          <CardHeader className="mb-4 py-4">
            <motion.div variants={itemVariants}>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="text-primary h-6 w-6" />
                <span>تفاصيل المصروف:</span>
              </CardTitle>
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
                  label="اسم المصروف"
                  value={name!}
                  icon={<Tag className="text-primary h-5 w-5" />}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="المبلغ"
                  value={price!}
                  icon={<DollarSign className="h-5 w-5 text-green-500" />}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="التصنيف"
                  value={category?.name ?? "لا يوجد"}
                  icon={<Tag className="h-5 w-5 text-blue-500" />}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="الحالة"
                  value={status ? "معتمد" : "ملغي"}
                  icon={
                    status ? (
                      <BadgeCheck className="text-green-500" />
                    ) : (
                      <BadgeX className="text-red-500" />
                    )
                  }
                />
              </motion.div>

              {!status && cancelled_info && (
                <motion.div variants={itemVariants}>
                  <InfoField
                    label="سبب الإلغاء"
                    value={cancelled_info}
                    icon={<BadgeX className="text-red-500" />}
                  />
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
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
                  label="تاريخ الصرف"
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

              <motion.div variants={itemVariants}>
                <InfoField
                  label="الخزينة"
                  value={treasury?.name ?? "لا يوجد"}
                  icon={<Wallet className="h-5 w-5 text-yellow-500" />}
                />
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default ExpenseDetails;
