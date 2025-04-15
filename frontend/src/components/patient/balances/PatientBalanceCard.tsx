import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IBalance } from "@/interfaces/patientBalances";
import formatDateTime from "@/utils/formatDate";
import { Calendar, CreditCard, Hash } from "lucide-react";
import { FaMoneyCheck } from "react-icons/fa6";
import { MdAttachMoney, MdMoneyOff } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";

interface IProps {
  balance: IBalance;
}
const PatientBalanceCard = ({ balance }: IProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-md cursor-pointer border-muted/40 hover:border-primary/40 dark:bg-black/60">
      <CardContent className="flex flex-col gap-4">
        <CardHeader className="px-0 pb-0 flex-row items-center justify-between">
          <CardTitle>
            <MdAttachMoney size={24} />
          </CardTitle>
        </CardHeader>
        <CardContent className="py-0 space-y-3 px-2 sm:px-3 lg:px-4 xl:px-2">
          <div className="flex items-center gap-2 text-black dark:text-white">
            <Hash className="h-5 w-5" />
            <h2 className="md:text-lg">كود الدفع:</h2>
            <p className="bg-foreground p-2 w-10 border border-primary/20 h-10 flex justify-center items-center rounded-full text-lg">
              {balance.transaction_code}
            </p>
          </div>
          <div className="flex items-center gap-2 text-black dark:text-white md:text-lg">
            <MdAttachMoney className="h-5 w-5" />
            <h2>المبلغ المدفوع:</h2>
            <p>{Number(balance.amount_paid)}</p>
          </div>
          <div className="flex items-center gap-2 text-black dark:text-white md:text-lg">
            <TbReportMoney className="h-5 w-5" />
            <h2>المبلغ الفعلي:</h2>
            <p>{Number(balance.total_amount_due)}</p>
          </div>
          <div className="flex items-center gap-2 text-black dark:text-white md:text-lg">
            <MdMoneyOff className="h-5 w-5" />
            <h2>المبلغ المستحق:</h2>
            <p>{Number(balance.balance)}</p>
          </div>

          {Number(balance.refund_amount) ? (
            <div className="flex items-center gap-2 text-black dark:text-white md:text-lg">
              <MdAttachMoney className="h-5 w-5" />
              <h2>المبلغ المسترد:</h2>
              <p>{Number(balance.refund_amount)}</p>
            </div>
          ) : null}

          <div className="flex items-center gap-2 text-black dark:text-white md:text-lg">
            <CreditCard className="h-5 w-5" />
            <h2>وسيلة الدفع :</h2>
            <p>{balance.payment_method === "cash" ? "نقدي" : "بطاقة بنكية"}</p>
          </div>

          <div className="flex items-center gap-2 text-black dark:text-white md:text-lg">
            <FaMoneyCheck className="h-5 w-5" />
            <h2>رقم العملية:</h2>
            <p>{balance.visa_code}</p>
          </div>
        </CardContent>
        <Separator className="dark:bg-gray-700" />
        <CardFooter className="pb-1 px-0 flex-col items-start gap-4">
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
