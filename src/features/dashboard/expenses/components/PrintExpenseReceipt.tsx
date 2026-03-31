import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Button } from "@/shared/components/ui/button";
import { FaPrint } from "react-icons/fa6";
import { IExpense } from "@/features/dashboard/expenses/types";
import { convertToEgyptianPounds } from "@/shared/utils/convertPriceNumberToWords";
import formatDateTime from "@/shared/utils/formatDate";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { numberToPrice } from "@/shared/utils/numberToPrice";

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
    date,
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
      document.title = `إذن صرف - ${name || "مصروفات"} - ${formattedDate}`;
    },
    onAfterPrint: () => {
      document.title = `Medical System | ${import.meta.env.VITE_WEB_NAME}`;
    },
  });

  const isCancelled = !status;

  return (
    <>
      <TooltipButton title="طباعة إذن الصرف">
        <Button
          onClick={() => reactToPrintFn()}
          size={"icon"}
          className="btn-primary rounded-full"
        >
          <FaPrint size={24} />
        </Button>
      </TooltipButton>

      <div
        dir="rtl"
        className="hidden print:block print:bg-white print:text-black"
        ref={contentRef}
      >
        <div className="relative mx-auto mt-3 w-full max-w-[210mm] overflow-hidden rounded-xl border border-gray-800 bg-white p-6 shadow print:shadow-none">
          {/* Cancelled Watermark */}
          {isCancelled && (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-30">
              <h1 className="transform-[rotate(-45deg)] border-4 border-red-600 px-12 py-6 text-7xl font-black tracking-widest text-red-600/80 uppercase select-none">
                ملغي
              </h1>
            </div>
          )}

          {/* Header */}
          <div className="mb-6 grid grid-cols-3 items-start gap-4 border-b-2 border-gray-700 pb-4">
            {/* Left - Logo & Clinic Name */}
            <div className="text-center">
              <div className="mx-auto mb-1 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 p-2.5 ring-1 ring-blue-200">
                <img
                  src="/images/logo.svg"
                  alt="logo"
                  className="h-12 w-12 object-contain"
                />
              </div>
              <h2 className="text-lg leading-tight font-bold">
                {import.meta.env.VITE_WEB_NAME}
              </h2>
              <p className="text-xs text-gray-600">
                الخدمات الطبية والرعاية الصحية
              </p>
            </div>

            {/* Center - Title */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">إذن صرف</h1>
              <p className="mt-1 text-sm font-medium text-red-600">
                رقم الإذن: {code}
              </p>
            </div>

            {/* Right - Info */}
            <div className="space-y-1.5 text-right text-sm">
              <p>
                <span className="font-semibold">المستخدم:</span>{" "}
                {employee?.name || "—"}
              </p>
              <p>
                <span className="font-semibold">الخزنة:</span>{" "}
                {treasury?.name || "—"}
              </p>
              <p>
                <span className="font-semibold">التاريخ:</span>{" "}
                {formatDateTime(date, {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-8 space-y-4 text-right">
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span className="font-semibold">تصنيف الصرف</span>
              <span>{category?.name || "غير محدد"}</span>
            </div>

            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span className="font-semibold">بيان الصرف</span>
              <span className="font-medium">{name || "—"}</span>
            </div>

            <div className="mt-6 rounded-lg bg-gray-50 p-4 text-center">
              <p className="text-lg">المبلغ المنصرف</p>
              <p className="mt-2 text-3xl font-bold text-blue-700">
                {numberToPrice(price)}
              </p>
              <p className="mt-1 text-base font-medium text-gray-700">
                {convertToEgyptianPounds(price)}
              </p>
            </div>

            {isCancelled && cancelled_info && (
              <div className="mt-4 rounded border border-red-300 bg-red-50 p-3">
                <p className="font-semibold text-red-800">سبب الإلغاء:</p>
                <p className="mt-1 text-red-700">{cancelled_info}</p>
              </div>
            )}
          </div>

          {/* Footer - Signatures */}
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="mb-10 border-t border-black pt-2 text-sm font-medium">
                المستلم
              </p>
              <p className="text-xs text-gray-500">......................</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gray-600 text-xs text-gray-500">
                الختم
              </div>
              <p className="text-sm font-medium">ختم العيادة</p>
            </div>

            <div>
              <p className="mb-10 border-t border-black pt-2 text-sm font-medium">
                سلطة الاعتماد
              </p>
              <p className="text-xs text-gray-500">......................</p>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-gray-500">
            عيادات {import.meta.env.VITE_WEB_NAME} – جميع الحقوق محفوظة ©{" "}
            {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </>
  );
};
