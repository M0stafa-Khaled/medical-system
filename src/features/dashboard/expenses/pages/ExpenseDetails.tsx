import InfoField from "@/shared/components/InfoField";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import formatDateTime from "@/shared/utils/formatDate";
import {
  LucideArrowLeft,
  LucideReceipt,
  LucideDollarSign,
  LucideTag,
  LucideUser,
  LucideCalendar,
  LucideWallet,
  LucideBadgeCheck,
  LucideBadgeX,
  LucideHash,
  LucideXCircle,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import DataLoader from "@/shared/components/ui/DataLoader";
import { Helmet } from "react-helmet-async";
import { useGetExpenseById } from "@/features/dashboard/expenses/queriesAndMutations";
import { AxiosResErr } from "@/shared/types";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { cn } from "@/shared/lib/utils";

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

  const isCancelled = !status;
  const statusColor = status
    ? "from-green-400 to-green-600"
    : "from-red-400 to-red-600";
  const statusLabel = status ? "معتمد" : "ملغي";

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تفاصيل المصروف</title>
      </Helmet>

      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-4 gap-2"
        onClick={() => navigate(-1)}
      >
        <LucideArrowLeft className="h-4 w-4" />
        رجوع
      </Button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Right Sidebar - Expense Summary */}
        <div className="lg:col-span-4">
          <Card className="overflow-hidden border-0 shadow-lg">
            {/* Gradient Cover */}
            <div className={cn("h-32 w-full bg-linear-to-br", statusColor)} />

            <CardContent className="flex flex-col items-center px-6 pb-6">
              {/* Receipt Icon */}
              <div className="relative -mt-16">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl dark:bg-gray-900">
                  <div
                    className={cn(
                      "flex h-20 w-20 items-center justify-center rounded-full",
                      statusColor
                    )}
                  >
                    <LucideReceipt className="text-foreground h-10 w-10" />
                  </div>
                </div>
              </div>

              {/* Expense Code */}
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <LucideHash className="text-muted-foreground h-5 w-5" />
                  <span className="text-2xl font-bold">{code}</span>
                </div>
                <p className="text-muted-foreground text-sm">رقم الإيصال</p>
              </div>

              {/* Status Badge */}
              <div className="mt-3">
                <Badge
                  className={cn("gap-1 px-4 py-1.5", statusColor, "text-white")}
                >
                  {status ? (
                    <LucideBadgeCheck className="h-3 w-3" />
                  ) : (
                    <LucideXCircle className="h-3 w-3" />
                  )}
                  {statusLabel}
                </Badge>
              </div>

              {/* Amount Card */}
              <div
                className={cn(
                  "mt-4 w-full rounded-xl p-4",
                  status
                    ? "bg-green-50 dark:bg-green-950/30"
                    : "bg-red-50 dark:bg-red-950/30"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl",
                        statusColor,
                        "shadow-lg"
                      )}
                    >
                      <LucideDollarSign className="text-foreground h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">المبلغ</p>
                      <p className="text-xl font-bold">{price}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category & Treasury Info */}
              <div className="mt-3 w-full space-y-2">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <LucideTag className="h-4 w-4 text-blue-500" />
                    <span className="text-muted-foreground text-sm">
                      التصنيف
                    </span>
                  </div>
                  <span className="font-medium">
                    {category?.name ?? "لا يوجد"}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <LucideWallet className="h-4 w-4 text-yellow-500" />
                    <span className="text-muted-foreground text-sm">
                      الخزنة
                    </span>
                  </div>
                  <span className="font-medium">
                    {treasury?.name ?? "لا يوجد"}
                  </span>
                </div>
              </div>

              {/* Cancel Reason */}
              {isCancelled && cancelled_info && (
                <div className="mt-3 w-full rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950/30">
                  <div className="flex items-center gap-2">
                    <LucideXCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-red-600">
                      سبب الإلغاء
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-red-600">{cancelled_info}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Left Side - Tabs */}
        <div className="lg:col-span-8">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="mb-4 grid h-auto w-full grid-cols-2 gap-2">
              <TabsTrigger value="details" className="gap-2 py-2.5">
                <LucideReceipt className="h-4 w-4" />
                <span className="hidden sm:inline">التفاصيل</span>
              </TabsTrigger>
              <TabsTrigger value="employee" className="gap-2 py-2.5">
                <LucideUser className="h-4 w-4" />
                <span className="hidden sm:inline">الموظف</span>
              </TabsTrigger>
            </TabsList>

            {/* Details Tab */}
            <TabsContent value="details">
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
                      <LucideReceipt className="text-primary h-4 w-4" />
                    </div>
                    تفاصيل المصروف
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <InfoField
                        label="اسم المصروف"
                        value={name!}
                        icon={<LucideTag className="text-primary h-4 w-4" />}
                      />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <InfoField
                        label="رقم الإيصال"
                        value={code!}
                        icon={
                          <LucideHash className="h-4 w-4 text-purple-500" />
                        }
                      />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <InfoField
                        label="التصنيف"
                        value={category?.name ?? "لا يوجد"}
                        icon={<LucideTag className="h-4 w-4 text-blue-500" />}
                      />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <InfoField
                        label="الحالة"
                        value={statusLabel}
                        icon={
                          status ? (
                            <LucideBadgeCheck className="h-4 w-4 text-green-500" />
                          ) : (
                            <LucideBadgeX className="h-4 w-4 text-red-500" />
                          )
                        }
                      />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <InfoField
                        label="الخزنة"
                        value={treasury?.name ?? "لا يوجد"}
                        icon={
                          <LucideWallet className="h-4 w-4 text-yellow-500" />
                        }
                      />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <InfoField
                        label="تاريخ الصرف"
                        value={
                          created_at
                            ? formatDateTime(created_at, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })
                            : ""
                        }
                        icon={
                          <LucideCalendar className="h-4 w-4 text-orange-500" />
                        }
                      />
                    </div>
                    {isCancelled && cancelled_info && (
                      <div className="col-span-full rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950/30">
                        <InfoField
                          label="سبب الإلغاء"
                          value={cancelled_info}
                          icon={
                            <LucideXCircle className="h-4 w-4 text-red-500" />
                          }
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Employee Tab */}
            <TabsContent value="employee">
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                      <LucideUser className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    معلومات الموظف
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-28 w-28">
                      <AvatarImage
                        src={employee?.personal_image || ""}
                        alt={employee?.name}
                      />
                      <AvatarFallback className="bg-orange-100 text-2xl dark:bg-orange-900/30">
                        {employee?.name?.charAt(0) || "ع"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-4 text-center">
                      <Link
                        to={`/dashboard/employees/${employee?.id}`}
                        className="text-xl font-bold transition-colors hover:text-orange-600"
                      >
                        {employee?.name}
                      </Link>
                      <p className="text-muted-foreground mt-1">موظف</p>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                    <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-950/30">
                      <InfoField
                        label="رقم الهاتف"
                        value={employee?.first_phone || ""}
                        icon={
                          <LucideUser className="h-4 w-4 text-orange-600" />
                        }
                      />
                    </div>
                    <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-950/30">
                      <InfoField
                        label="الوظيفة"
                        value={employee?.job || ""}
                        icon={<LucideTag className="h-4 w-4 text-orange-600" />}
                      />
                    </div>
                    <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-950/30">
                      <InfoField
                        label="الخزنة"
                        value={employee?.treasury?.name || ""}
                        icon={
                          <LucideWallet className="h-4 w-4 text-orange-600" />
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ExpenseDetails;
