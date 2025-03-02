import InfoField from "@/components/dashboard/InfoField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetExpenseById } from "@/lib/react-query/expenses";
import cookieServices from "@/utils/cookieServices";
import formatDateTime from "@/utils/formatDate";
import {
  Loader2,
  DollarSign,
  Tag,
  User2,
  Calendar,
  Receipt,
  Wallet,
  BadgeCheck,
  BadgeX,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ExpenseDetails = () => {
  const navigate = useNavigate();
  const { expenseId } = useParams();
  const token = cookieServices.getToken()!;
  const {
    data: expense,
    isLoading,
    isError,
  } = useGetExpenseById({
    token,
    id: expenseId!,
  });

  useEffect(() => {
    if (isError) {
      toast.error("فشل في تحميل بيانات الموظف");
      navigate(-1);
      return;
    }

    if (!expense?.status && expense?.message) {
      toast.error(expense.message);
      navigate(-1);
      return;
    }
  }, [expense, isError, navigate]);

  if (isLoading)
    return (
      <div className="mt-20 text-black dark:text-white flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin" size={48} />
        <p className="text-lg font-medium animate-pulse">
          جاري تحميل البيانات...
        </p>
      </div>
    );

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
    <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="mb-4 flex items-center gap-2">
          <Receipt className="h-6 w-6 text-primary" />
          <span>تفاصيل المصروف:</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoField
            label="اسم المصروف"
            value={name!}
            icon={<Tag className="h-5 w-5 text-primary" />}
          />

          <InfoField
            label="المبلغ"
            value={price!}
            icon={<DollarSign className="h-5 w-5 text-green-500" />}
          />

          <InfoField
            label="التصنيف"
            value={category?.name ?? "لا يوجد"}
            icon={<Tag className="h-5 w-5 text-blue-500" />}
          />

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
          {!status && cancelled_info && (
            <InfoField
              label="سبب الإلغاء"
              value={cancelled_info}
              icon={<BadgeX className="text-red-500" />}
            />
          )}

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

          <InfoField
            label="رقم الإيصال"
            value={code!}
            icon={<Receipt className="h-5 w-5 text-purple-500" />}
          />

          <InfoField
            label="الخزينة"
            value={treasury?.name ?? "لا يوجد"}
            icon={<Wallet className="h-5 w-5 text-yellow-500" />}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseDetails;
