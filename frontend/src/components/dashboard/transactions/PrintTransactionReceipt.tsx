import { Button } from "@/components/ui/button";
import TooltipButton from "@/components/ui/TooltipButton";
import { ITransaction } from "@/interfaces/dashboard/transactions/transactions";
import { convertToEgyptianPounds } from "@/utils/convertPriceNumberToWords";
import formatDateTime from "@/utils/formatDate";
import { useRef } from "react";
import { FaPrint } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";

interface IProps {
  transaction: ITransaction;
}

const PrintTransactionReceipt = ({ transaction }: IProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    onBeforePrint: async () => {
      const formattedDate = formatDateTime(new Date().toISOString(), {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      document.title = `تحصيل - ${transaction.code} - ${formattedDate}`;
    },
    onAfterPrint: () => {
      document.title = `Medical System | ${import.meta.env.VITE_WEB_NAME}`;
    },
  });
  // Calculate total amount from actions
  const totalAmount = transaction.actions.reduce(
    (sum, action) => sum + action.price,
    0
  );

  return (
    <>
      <TooltipButton title="طباعة">
        <Button
          onClick={reactToPrintFn}
          className="text-sm text-white bg-blue-600 hover:bg-blue-700 h-9 w-9"
        >
          <FaPrint size={24} />
        </Button>
      </TooltipButton>

      <div
        dir="rtl"
        className="hidden p-3 print:block print:text-black"
        ref={contentRef}
      >
        <div className="relative p-4 mx-auto overflow-hidden bg-white border-2 border-gray-500 rounded-lg max-w-lg shadow-xl">
          {/* Cancelled watermark */}
          {!transaction.status && (
            <h1 className="text-red-700 text-center absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full transform -rotate-[27deg] scale-150 font-bold border-y border-black p-4 opacity-70 text-4xl">
              ملغي
            </h1>
          )}

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-dashed border-gray-400">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="p-2 border border-gray-400 rounded-full">
                {/* Logo SVG - Replace with your logo */}
                <img src="/images/logo.svg" alt="" className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-lg font-bold">DR. WALID MEHREM</h2>
                <p className="text-xs text-gray-600">Mothercare Clinic</p>
              </div>
            </div>
            <div className="flex flex-col items-end text-sm">
              <h1 className="text-xl font-bold">عيادات ماذر كلينيك</h1>
              <div className="mt-4 flex items-center">
                <p className="text-gray-600">التاريخ:</p>
                <p className="ml-2 font-bold">
                  {formatDateTime(transaction.created_at, {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Transaction Info */}
          <div className="py-4 border-b border-dashed border-gray-400 grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <span className="text-gray-600 w-24">العيادة:</span>
                <span className="font-bold flex-1">نساء وتوليد</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 w-24">اسم المريض:</span>
                <span className="font-bold flex-1">
                  {transaction.patient.name}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 w-24">جهة التعاقد:</span>
                <span className="font-bold flex-1">مصريين</span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <span className="text-gray-600 w-32">الطبيب المعالج:</span>
                <span className="font-bold flex-1">
                  {transaction.doctor.item.name}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 w-32">نوع المريض:</span>
                <span className="font-bold flex-1">
                  {transaction.patient.gender === "Male" ? "ذكر" : "أنثى"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 w-32">رقم الكارنية:</span>
                <span className="font-bold flex-1">...</span>
              </div>
            </div>
          </div>

          {/* Bill Content */}
          <div className="py-4 border-b border-dashed border-gray-400">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <span className="text-gray-600 w-24">الكود: </span>
                <span className="font-bold flex-1">{transaction.code}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 w-24">الخدمة: </span>
                <span className="font-bold flex-1">
                  {transaction.actions.map((a) => a.name).join(", ")}
                </span>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-gray-600 w-24">قيمة الخدمة:</span>
              <span className="font-bold flex-1">{totalAmount}</span>
            </div>
          </div>

          {/* Totals */}
          <div className="py-4 border-b border-dashed border-gray-400">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-bold">تحمل المريض:</span>
              <span className="font-bold text-lg">
                {transaction.balance.amount_paid}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-bold">تحمل الجهة:</span>
              <span className="font-bold text-lg">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-bold">الإجمالي:</span>
              <span className="font-bold text-lg">{totalAmount}</span>
            </div>
            <p className="mt-4 text-sm">
              المبلغ وقدره:{" "}
              <span className="font-bold">
                {convertToEgyptianPounds(totalAmount.toString())}
              </span>
            </p>
          </div>

          {/* Footer */}
          <div className="py-4 grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <span className="text-gray-600 w-32">الخزينة:</span>
                <span className="font-bold flex-1">
                  {transaction.treasury.name}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 w-32">طريقة الدفع:</span>
                <span className="font-bold flex-1">نقدي</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 w-32">مدخل البيانات:</span>
                <span className="font-bold flex-1">
                  {transaction.employee.name}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${transaction.code}`}
                alt="QR Code"
                className="w-24 h-24 mb-2"
              />
              <p className="text-gray-600 text-sm font-bold">
                {transaction.code}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <p className="text-center text-xs text-gray-600 mt-4 border-t border-dashed border-gray-400 pt-2">
            ا ش - مكور - بجوار مسجد السلام - الهرم - الجيزة
            <br />
            01501868008 - 01098570008 - 01113356459
          </p>
        </div>
      </div>
    </>
  );
};

export default PrintTransactionReceipt;
