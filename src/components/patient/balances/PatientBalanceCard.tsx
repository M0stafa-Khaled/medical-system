import { IBalance } from "@/interfaces/dashboard/transactions/transactions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import formatDateTime from "@/shared/utils/formatDate";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { Calendar, CreditCard, Hash } from "lucide-react";
import { FaMoneyCheck } from "react-icons/fa6";
import { MdAttachMoney, MdMoneyOff } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";

interface IProps {
  balance: IBalance;
}
const PatientBalanceCard = ({ balance }: IProps) => {
  return (
    <Card className="border-muted/40 hover:border-primary/40 cursor-pointer transition-all duration-300 hover:shadow-md dark:bg-black/60">
      <CardContent className="flex flex-col gap-4">
        <CardHeader className="flex-row items-center justify-between px-0 pb-0">
          <CardTitle>
            <MdAttachMoney size={24} />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-2 py-0 sm:px-3 lg:px-4 xl:px-2">
          <div className="flex items-center gap-2 text-black dark:text-white">
            <Hash className="h-5 w-5" />
            <h2 className="md:text-lg">كود الدفع:</h2>
            <p className="bg-foreground border-primary/20 flex h-10 w-10 items-center justify-center rounded-full border p-2 text-lg">
              {balance.transaction_code}
            </p>
          </div>
          <div className="flex items-center gap-2 text-black md:text-lg dark:text-white">
            <MdAttachMoney className="h-5 w-5" />
            <h2>المبلغ المدفوع:</h2>
            <p>{numberToPrice(balance.amount_paid)}</p>
          </div>
          <div className="flex items-center gap-2 text-black md:text-lg dark:text-white">
            <TbReportMoney className="h-5 w-5" />
            <h2>المبلغ الفعلي:</h2>
            <p>{numberToPrice(balance.total_amount_due)}</p>
          </div>
          <div className="flex items-center gap-2 text-black md:text-lg dark:text-white">
            <MdMoneyOff className="h-5 w-5" />
            <h2>المبلغ المستحق:</h2>
            <p>{numberToPrice(balance.balance)}</p>
          </div>

          {Number(balance.refund_amount) ? (
            <div className="flex items-center gap-2 text-black md:text-lg dark:text-white">
              <MdAttachMoney className="h-5 w-5" />
              <h2>المبلغ المسترد:</h2>
              <p>{numberToPrice(balance.refund_amount)}</p>
            </div>
          ) : null}

          <div className="flex items-center gap-2 text-black md:text-lg dark:text-white">
            <CreditCard className="h-5 w-5" />
            <h2>وسيلة الدفع :</h2>
            <p>{balance.payment_method === "cash" ? "نقدي" : "بطاقة بنكية"}</p>
          </div>

          <div className="flex items-center gap-2 text-black md:text-lg dark:text-white">
            <FaMoneyCheck className="h-5 w-5" />
            <h2>رقم العملية:</h2>
            <p>{balance.visa_code}</p>
          </div>
        </CardContent>
        <Separator className="dark:bg-gray-700" />
        <CardFooter className="flex-col items-start gap-4 px-0 pb-1">
          <div className="flex items-center gap-2 text-black dark:text-white">
            <Calendar className="h-5 w-5" />
            <h2 className="text-sm">تاريخ الدفع:</h2>
            <p className="text-sm">{formatDateTime(balance.created_at!)}</p>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default PatientBalanceCard;
