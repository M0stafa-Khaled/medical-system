import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FaPrint } from "react-icons/fa6";
import { IExpense } from "@/interfaces/dashboard/expenses/expense";
import { convertToEgyptianPounds } from "@/utils/convertPriceNumberToWords";
import formatDateTime from "@/utils/formatDate";

interface IProps {
  expense: IExpense;
}
const PrintExpenseReceipt = ({
  expense: {
    cancelled_info,
    category,
    code,
    price,
    name,
    employee,
    created_at,
    status,
    treasury,
  },
}: IProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    onBeforePrint: async () => {
      const formattedDate = formatDateTime(new Date().toISOString(), {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      document.title = `إذن صرف - ${name} - ${formattedDate}`;
    },
    onAfterPrint: () => {
      document.title = `Medical System | ${import.meta.env.VITE_WEB_NAME}`;
    },
  });

  return (
    <div>
      <Button
        onClick={() => reactToPrintFn()}
        className="text-sm text-white bg-blue-600 hover:bg-blue-700 h-9 w-9"
      >
        <FaPrint size={24} />
      </Button>
      <div
        dir="rtl"
        className="hidden p-3 print:block print:text-black"
        ref={contentRef}
      >
        <div className="relative p-4 mx-auto overflow-hidden bg-white border-2 border-gray-500 rounded-lg">
          {/* Cancel */}
          {!status && (
            <h1 className="text-red-700 text-center absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full transform -rotate-[27deg] scale-150 font-bold border-y border-black p-4 opacity-70 text-4xl">
              ملغي
            </h1>
          )}
          {/* Header */}
          <div className="flex items-center justify-between mb-2 border-b-2 border-gray-500 border-solid">
            <div className="text-center space-y-3 w-1/3">
              <h2 className="text-lg font-bold text-center">
                <img
                  src="/logo.svg"
                  alt="logo"
                  className="max-h-16 w-full mx-auto"
                />
              </h2>
              <h3 className="text-center">عيادات أبو لهب</h3>
            </div>
            <div className="text-center space-y-2 w-1/3">
              <h1 className="text-xl font-bold">إذن صرف</h1>
              <h1 className="text-sm text-red-500">NO: {code}</h1>
            </div>
            <div className="text-right space-y-1 max-w-64 w-1/3">
              <h2 className="break-words">المستخدم: {employee?.name}</h2>
              <h3>الخزينة: {treasury?.name}</h3>
              <h3>
                التاريخ:{" "}
                {formatDateTime(created_at, {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })}
              </h3>
            </div>
          </div>
          {/* Content */}
          <div className="my-4 space-y-3">
            <h3 className="text-right">تصنيف الصرف : {category?.name}</h3>
            <h3 className="text-right ">سند الصرف : {name}</h3>
            <h3 className="text-lg font-medium text-right">
              المبلغ المنصرف:{" "}
              <span className="font-semibold">{price} جنيه</span>
              {" / "}
              <span className="font-normal">
                {convertToEgyptianPounds(price)}
              </span>
            </h3>
            {!status && (
              <div className="my-3">
                <h3 className="text-right text-">
                  ملاحظات : {cancelled_info || "لا يوجد"}
                </h3>
              </div>
            )}
          </div>
          {/* Footer */}
          <div className="flex justify-between mt-4">
            <div className="w-1/3 pt-2 text-center">
              <h3>المستلم</h3>
              <h5>................</h5>
            </div>
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-3 border-2 border-gray-500 rounded-full">
              <h3 className="text-gray-500">الشعار</h3>
            </div>
            <div className="w-1/3 pt-2 text-center">
              <h3>سلطة الأعتماد</h3>
              <h5>................</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintExpenseReceipt;
