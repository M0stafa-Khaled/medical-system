import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Button } from "@/shared/components/ui/button";
import { FaPrint } from "react-icons/fa6";
import { IExpense } from "@/features/dashboard/expenses/types";
import { convertToEgyptianPounds } from "@/shared/utils/convertPriceNumberToWords";
import formatDateTime from "@/shared/utils/formatDate";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";

interface IProps {
  expense: IExpense;
}
export const PrintExpenseReceipt = ({
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
    <>
      <TooltipButton title="طباعة">
        <Button
          onClick={() => reactToPrintFn()}
          className="h-9 w-9 bg-blue-600 text-sm text-white hover:bg-blue-700"
        >
          <FaPrint size={24} />
        </Button>
      </TooltipButton>
      <div
        dir="rtl"
        className="hidden p-3 print:block print:text-black"
        ref={contentRef}
      >
        <div className="relative mx-auto overflow-hidden rounded-lg border-2 border-gray-500 bg-white p-4">
          {/* Cancel */}
          {!status && (
            <h1 className="absolute top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 scale-150 -rotate-27 transform border-y border-black p-4 text-center text-4xl font-bold text-red-700 opacity-70">
              ملغي
            </h1>
          )}
          {/* Header */}
          <div className="mb-2 flex items-center justify-between border-b-2 border-solid border-gray-500">
            <div className="w-1/3 space-y-3 text-center">
              <h2 className="text-center text-lg font-bold">
                <img
                  src="/images/logo.svg"
                  alt="logo"
                  className="mx-auto max-h-16 w-full"
                />
              </h2>
              <h3 className="text-center">عيادات أبو لهب</h3>
            </div>
            <div className="w-1/3 space-y-2 text-center">
              <h1 className="text-xl font-bold">إذن صرف</h1>
              <h1 className="text-sm text-red-500">NO: {code}</h1>
            </div>
            <div className="w-1/3 max-w-64 space-y-1 text-right">
              <h2 className="wrap-break-word">المستخدم: {employee?.name}</h2>
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
            <h3 className="text-right">سند الصرف : {name}</h3>
            <h3 className="text-right text-lg font-medium">
              المبلغ المنصرف:{" "}
              <span className="font-semibold">{price} جنيه</span>
              {" / "}
              <span className="font-normal">
                {convertToEgyptianPounds(price)}
              </span>
            </h3>
            {!status && (
              <div className="my-3">
                <h3 className="text- text-right">
                  ملاحظات : {cancelled_info || "لا يوجد"}
                </h3>
              </div>
            )}
          </div>
          {/* Footer */}
          <div className="mt-4 flex justify-between">
            <div className="w-1/3 pt-2 text-center">
              <h3>المستلم</h3>
              <h5>................</h5>
            </div>
            <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gray-500">
              <h3 className="text-gray-500">الشعار</h3>
            </div>
            <div className="w-1/3 pt-2 text-center">
              <h3>سلطة الأعتماد</h3>
              <h5>................</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
