import InfoField from "@/shared/components/InfoField";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import formatDateTime from "@/shared/utils/formatDate";
import {
  LucideDollarSign,
  LucideUser,
  LucideCalendar,
  LucideReceipt,
  LucideWallet,
  LucideBadgeCheck,
  LucideBadgeX,
  LucideCreditCard,
  LucideHash,
  LucideFileText,
  LucidePiggyBank,
  LucideClipboardList,
  LucideStethoscope,
  LucideArrowLeft,
  LucideRefreshCcw,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import DataLoader from "@/shared/components/ui/DataLoader";
import { Helmet } from "react-helmet-async";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { AxiosResErr } from "@/shared/types";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { RefundTransaction } from "../components/RefundTransaction";
import { useGetTransactionById } from "../queriesAndMutations";
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

  // Get status color and info
  const isRefunded = !status;
  const statusColor = status
    ? "from-green-400 to-green-600"
    : "from-red-400 to-red-600";
  const statusLabel = status ? "محصل" : "مسترد";
  const statusBgColor = status
    ? "bg-green-50 dark:bg-green-950/30"
    : "bg-red-50 dark:bg-red-950/30";

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تفاصيل التحصيل</title>
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
        {/* Right Sidebar - Transaction Summary */}
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

              {/* Transaction Code */}
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
                    <LucideRefreshCcw className="h-3 w-3" />
                  )}
                  {statusLabel}
                </Badge>
              </div>

              {/* Amount Card */}
              <div className={cn("mt-4 w-full rounded-xl p-4", statusBgColor)}>
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
                      <p className="text-muted-foreground text-xs">
                        المبلغ المدفوع
                      </p>
                      <p className="text-xl font-bold">
                        {numberToPrice(balance?.amount_paid as string)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Balance Info */}
              <div className="mt-3 w-full space-y-2">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <LucidePiggyBank className="h-4 w-4 text-red-500" />
                    <span className="text-muted-foreground text-sm">
                      المبلغ الفعلي
                    </span>
                  </div>
                  <span className="font-medium">
                    {numberToPrice(balance?.total_amount_due as string)}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <LucidePiggyBank className="h-4 w-4 text-red-500" />
                    <span className="text-muted-foreground text-sm">
                      المبلغ المستحق
                    </span>
                  </div>
                  <span className="font-medium">
                    {numberToPrice(balance?.balance as string)}
                  </span>
                </div>
                {isRefunded && (
                  <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950/30">
                    <div className="flex items-center gap-2">
                      <LucideRefreshCcw className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-600">
                        المبلغ المسترد
                      </span>
                    </div>
                    <span className="font-medium text-red-600">
                      {numberToPrice(balance?.refund_amount as string)}
                    </span>
                  </div>
                )}
              </div>

              {/* Refund Button */}
              {canRefundTransaction && status && (
                <div className="mt-4 w-full">
                  <RefundTransaction
                    code={code!}
                    id={id!}
                    icon={false}
                    className="w-full rounded-md"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Left Side - Tabs */}
        <div className="lg:col-span-8">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="mb-4 grid h-auto w-full grid-cols-4 gap-2">
              <TabsTrigger value="details" className="gap-2 py-2.5">
                <LucideReceipt className="h-4 w-4" />
                <span className="hidden sm:inline">التفاصيل</span>
              </TabsTrigger>
              <TabsTrigger value="patient" className="gap-2 py-2.5">
                <LucideUser className="h-4 w-4" />
                <span className="hidden sm:inline">المريض</span>
              </TabsTrigger>
              <TabsTrigger value="doctor" className="gap-2 py-2.5">
                <LucideStethoscope className="h-4 w-4" />
                <span className="hidden sm:inline">الطبيب</span>
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
                    تفاصيل التحصيل
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <InfoField
                        label="وسيلة الدفع"
                        value={
                          balance?.payment_method === "cash"
                            ? "نقدي"
                            : "بطاقة بنكية"
                        }
                        icon={
                          <LucideCreditCard className="h-4 w-4 text-blue-500" />
                        }
                      />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <InfoField
                        label="نوع التحصيل"
                        value={balance?.type === "inquiry" ? "كشف" : "دفعة"}
                        icon={
                          <LucideFileText className="h-4 w-4 text-amber-500" />
                        }
                      />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <InfoField
                        label="الخدمة"
                        value={
                          actions
                            ?.map((action) => action.name)
                            .join(", ") as string
                        }
                        icon={
                          <LucideClipboardList className="h-4 w-4 text-cyan-500" />
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
                        label="تاريخ التحصيل"
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
                    {isRefunded && refund_info && (
                      <div className="col-span-full rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950/30">
                        <InfoField
                          label="سبب الاسترداد"
                          value={refund_info}
                          icon={
                            <LucideRefreshCcw className="h-4 w-4 text-red-500" />
                          }
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Patient Tab */}
            <TabsContent value="patient">
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <LucideUser className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    معلومات المريض
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-28 w-28">
                      <AvatarImage
                        src={patient?.personal_image || ""}
                        alt={patient?.name}
                      />
                      <AvatarFallback className="bg-blue-100 text-2xl dark:bg-blue-900/30">
                        {patient?.name?.charAt(0) || "م"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-4 text-center">
                      <Link
                        to={`/dashboard/patients/${patient?.id}`}
                        className="text-xl font-bold transition-colors hover:text-blue-600"
                      >
                        {patient?.name}
                      </Link>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                    <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30">
                      <InfoField
                        label="رقم الهاتف"
                        value={patient?.first_phone || ""}
                        icon={<LucideUser className="h-4 w-4 text-blue-600" />}
                      />
                    </div>
                    <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30">
                      <InfoField
                        label="رقم الملف"
                        value={patient?.personal_id || ""}
                        icon={<LucideHash className="h-4 w-4 text-blue-600" />}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Doctor Tab */}
            <TabsContent value="doctor">
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                      <LucideStethoscope className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    معلومات الطبيب
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-28 w-28">
                      <AvatarImage
                        src={doctor?.item?.image || ""}
                        alt={doctor?.item?.name}
                      />
                      <AvatarFallback className="bg-purple-100 text-2xl dark:bg-purple-900/30">
                        {doctor?.item?.name?.charAt(0) || "ط"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-4 text-center">
                      <Link
                        to={`/dashboard/doctors/${doctor?.item?.id}`}
                        className="text-xl font-bold transition-colors hover:text-purple-600"
                      >
                        {doctor?.item?.name}
                      </Link>
                      <p className="text-muted-foreground mt-1">طبيب</p>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                    <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-950/30">
                      <InfoField
                        label="رقم القيد"
                        value={doctor?.item?.register_id || ""}
                        icon={
                          <LucideHash className="h-4 w-4 text-purple-600" />
                        }
                      />
                    </div>
                    <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-950/30">
                      <InfoField
                        label="رقم الهاتف"
                        value={doctor?.item?.first_phone || ""}
                        icon={
                          <LucideUser className="h-4 w-4 text-purple-600" />
                        }
                      />
                    </div>
                    <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-950/30">
                      <InfoField
                        label="الجنس"
                        value={
                          doctor?.item?.gender === "Male"
                            ? "ذكر"
                            : doctor?.item?.gender === "Female"
                              ? "انثى"
                              : ""
                        }
                        icon={
                          <LucideUser className="h-4 w-4 text-purple-600" />
                        }
                      />
                    </div>
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
                        src={employee?.image || ""}
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
                        icon={
                          <LucideUser className="h-4 w-4 text-orange-600" />
                        }
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

export default TransactionDetails;
