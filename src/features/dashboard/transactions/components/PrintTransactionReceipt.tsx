import { Button } from "@/shared/components/ui/button";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { ITransaction } from "@/features/dashboard/transactions/types";
import { convertToEgyptianPounds } from "@/shared/utils/convertPriceNumberToWords";
import formatDateTime from "@/shared/utils/formatDate";
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
          size={"icon"}
          className="btn-primary rounded-full"
        >
          <FaPrint size={24} />
        </Button>
      </TooltipButton>

      <div
        dir="rtl"
        className="hidden p-3 print:block print:text-black"
        ref={contentRef}
      >
        <div className="relative mx-auto max-w-lg overflow-hidden rounded-lg border-2 border-gray-500 bg-white p-4 shadow-xl">
          {/* Cancelled watermark */}
          {!transaction.status && (
            <h1 className="absolute top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 scale-150 -rotate-27 transform border-y border-black p-4 text-center text-4xl font-bold text-red-700 opacity-70">
              ملغي
            </h1>
          )}

          {/* Header */}
          <div className="flex items-center justify-between border-b border-dashed border-gray-400 pb-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="rounded-full border border-gray-400 p-2">
                {/* Logo SVG - Replace with your logo */}
                <img src="/images/logo.svg" alt="" className="h-12 w-12" />
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
          <div className="grid grid-cols-2 gap-4 border-b border-dashed border-gray-400 py-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <span className="w-24 text-gray-600">العيادة:</span>
                <span className="flex-1 font-bold">نساء وتوليد</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-gray-600">اسم المريض:</span>
                <span className="flex-1 font-bold">
                  {transaction.patient.name}
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-gray-600">جهة التعاقد:</span>
                <span className="flex-1 font-bold">مصريين</span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <span className="w-32 text-gray-600">الطبيب المعالج:</span>
                <span className="flex-1 font-bold">
                  {transaction.doctor.item.name}
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-32 text-gray-600">نوع المريض:</span>
                <span className="flex-1 font-bold">
                  {transaction.patient.gender === "Male" ? "ذكر" : "أنثى"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-32 text-gray-600">رقم الكارنية:</span>
                <span className="flex-1 font-bold">...</span>
              </div>
            </div>
          </div>

          {/* Bill Content */}
          <div className="border-b border-dashed border-gray-400 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <span className="w-24 text-gray-600">الكود: </span>
                <span className="flex-1 font-bold">{transaction.code}</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-gray-600">الخدمة: </span>
                <span className="flex-1 font-bold">
                  {transaction.actions.map((a) => a.name).join(", ")}
                </span>
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="w-24 text-gray-600">قيمة الخدمة:</span>
              <span className="flex-1 font-bold">{totalAmount}</span>
            </div>
          </div>

          {/* Totals */}
          <div className="border-b border-dashed border-gray-400 py-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-bold text-gray-600">تحمل المريض:</span>
              <span className="text-lg font-bold">
                {transaction.balance.amount_paid}
              </span>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-bold text-gray-600">تحمل الجهة:</span>
              <span className="text-lg font-bold">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-600">الإجمالي:</span>
              <span className="text-lg font-bold">{totalAmount}</span>
            </div>
            <p className="mt-4 text-sm">
              المبلغ وقدره:{" "}
              <span className="font-bold">
                {convertToEgyptianPounds(totalAmount.toString())}
              </span>
            </p>
          </div>

          {/* Footer */}
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <span className="w-32 text-gray-600">الخزينة:</span>
                <span className="flex-1 font-bold">
                  {transaction.treasury.name}
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-32 text-gray-600">طريقة الدفع:</span>
                <span className="flex-1 font-bold">نقدي</span>
              </div>
              <div className="flex items-center">
                <span className="w-32 text-gray-600">مدخل البيانات:</span>
                <span className="flex-1 font-bold">
                  {transaction.employee.name}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${transaction.code}`}
                alt="QR Code"
                className="mb-2 h-24 w-24"
              />
              <p className="text-sm font-bold text-gray-600">
                {transaction.code}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <p className="mt-4 border-t border-dashed border-gray-400 pt-2 text-center text-xs text-gray-600">
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
