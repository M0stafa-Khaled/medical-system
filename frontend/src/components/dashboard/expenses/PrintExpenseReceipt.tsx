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
      {/* start cancel */}
      <div className="absolute top-0 right-0 flex items-center justify-center w-full h-full pointer-events-none">
        <div className="absolute top-2 right-2 h-[98%] w-0.5 bg-black transform rotate-45 origin-top-right"></div>
        <h1 className="absolute text-5xl font-bold transform rotate-45 opacity-50">ملغي</h1>
        <div className="absolute bottom-2 left-2 h-[98%] w-0.5 bg-black transform rotate-45 origin-bottom-left"></div>
      </div>
      {/* end cancel */}
      <div className="relative flex items-center justify-between pb-2 border-b-2 border-gray-500 border-solid">
        <div className="text-center">
          <h2 className="text-lg font-bold">لوجو</h2>
          <h3 className="text-md">عيادات أبو لهم</h3>
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold">إذن صرف</h1>
          <h1 className="text-lg">NO: 0001</h1>
        </div>
        <div className="text-right">
          <h2 className="text-md">المستخدم: إسلام الجوهري</h2>
          <h3 className="text-md">الخزينة: الرئيسية</h3>
          <h3 className="text-md">التاريخ: 22/2/2025</h3>
        </div>
      </div>
      <div className="relative pb-4 mt-4 space-y-2">
        <h3 className="text-right text-md">تصنيف الصرف :  كهرباء</h3>
        <h3 className="text-right text-md">سند الصرف : كهرباء شقة مصر الجديدة عن شهر أكتوبر 2025</h3>
        <h2 className="text-lg font-semibold text-right">المبلغ المنصرف: 500 جنيه</h2>
        <h4 className="text-right text-md">خمسمائة جنية فقط لاغير</h4>
      </div>
      <div className="pb-4 mt-4">
        <h3 className="text-right text-md">ملاحظات :</h3>
      </div>
      <div className="relative flex justify-between mt-4">
        <div className="w-1/3 pt-2 text-center border-black">
          <h3 className="text-md">المستلم</h3>
          <h5 className="text-md">................</h5>
        </div>
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 border-2 border-gray-500 rounded-full">
            <h3 className="text-gray-500 text-md ">الشعار</h3>
        </div>
        <div className="w-1/3 pt-2 text-center border-black">
          <h3 className="text-md">سلطة الأعتماد</h3>
          <h5 className="text-md">................</h5>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default PrintExpenseReceipt;
