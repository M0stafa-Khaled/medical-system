import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FaPrint } from "react-icons/fa6";

const PrintExpenseReceipt = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div>
      <Button
        onClick={() => reactToPrintFn()}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm h-9 w-9"
      >
        <FaPrint size={24} />
      </Button>
      <div
        dir="rtl"
        className="hidden print:block print:text-black p-3"
        ref={contentRef}
      >
        <div className="border-2 border-black p-3">
          <div className="flex justify-between content-between text-center">
            <div className="flex flex-col justify-between gap-y-2">
              <h2 className="text-center">لوجو</h2>
              <h3 className="text-center">عيادات ابو لهم</h3>
            </div>
            <div className="flex flex-col justify-between gap-y-2">
              <h1 className="text-xl text-center">أذن صرف</h1>
              <h1 className="text-xl text-center">NO:0001</h1>
            </div>
            <div className="flex flex-col justify-between gap-y-2">
              <h2>مدخل البيانات/ اسلام الجوهرى</h2>
              <h3>الخزينة / الرئيسية</h3>
              <h3>التاريخ / 22/2/2025</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintExpenseReceipt;
