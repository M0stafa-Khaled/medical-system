import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { FaPrint } from "react-icons/fa6";
import {
  IPrescriptable,
  IPrescription,
} from "@/features/dashboard/prescriptions/types";
import formatDateTime from "@/shared/utils/formatDate";
import { TPrescriptableType } from "@/shared/types";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { Button } from "@/shared/components/ui/button";

interface IProps {
  prescription: IPrescription;
}

const PrintPrescriptionReceipt = ({ prescription }: IProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    onBeforePrint: async () => {
      const formattedDate = formatDateTime(new Date().toISOString(), {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
      document.title = `روشة - ${prescription.patient.name} - ${formattedDate}`;
    },
    onAfterPrint: () => {
      document.title = `Medical System`;
    },
  });

  const groupedPrescriptables = prescription.prescriptables.reduce(
    (acc, curr) => {
      (acc[curr.type] = acc[curr.type] || []).push(curr);
      return acc;
    },
    {} as { [key in TPrescriptableType]?: IPrescriptable[] }
  );

  return (
    <>
      <TooltipButton title="طباعة">
        <Button
          onClick={() => reactToPrintFn()}
          size="icon"
          className="btn-primary rounded-full"
        >
          <FaPrint size={24} />
        </Button>
      </TooltipButton>

      {/* ─── Printable content ──────────────────────────────────────────────── */}
      <div
        dir="rtl"
        className="hidden print:block print:bg-white print:text-black"
        ref={contentRef}
      >
        <div className="relative mx-auto min-h-[297mm] w-[210mm] max-w-[210mm] border border-gray-200 bg-white p-8 pb-30 print:shadow-none">
          {/* Header ─────────────────────────────────────────────────────────── */}
          <header className="mb-8 flex items-center justify-between border-b-2 border-blue-900/30 pb-5">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-50 p-2.5 ring-1 ring-blue-200">
                <img
                  src="/images/logo.svg"
                  alt="logo"
                  className="h-14 w-14 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-blue-950">
                  {import.meta.env.VITE_WEB_NAME}
                </h1>
                <p className="mt-0.5 text-sm font-medium text-gray-600">
                  الخدمات الطبية والرعاية الصحية
                </p>
              </div>
            </div>

            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-900">
                د/ {prescription.doctor.name}
              </h2>
              <p className="mt-1 text-sm text-gray-700">
                {prescription.clinic.name || import.meta.env.VITE_WEB_NAME}
              </p>
              <p className="text-sm text-gray-600">
                {prescription.doctor.first_phone}
                {prescription.doctor.second_phone &&
                  ` - ${prescription.doctor.second_phone}`}
              </p>
            </div>
          </header>

          {/* Patient & Visit Info ───────────────────────────────────────────── */}
          <section className="mb-8 grid grid-cols-3 gap-6 rounded-lg border bg-gray-50/70 p-5 text-sm">
            <div>
              <span className="block font-semibold text-gray-900">
                اسم المريض
              </span>
              <span className="mt-1 block text-gray-800">
                {prescription.patient.name}
              </span>
            </div>
            <div>
              <span className="block font-semibold text-gray-900">التاريخ</span>
              <span className="mt-1 block text-gray-800">
                {formatDateTime(prescription.date)}
              </span>
            </div>
            <div>
              <span className="block font-semibold text-gray-900">
                العيادة / المركز
              </span>
              <span className="mt-1 block text-gray-800">
                {prescription.clinic.name}
              </span>
            </div>
          </section>

          {/* Prescriptions Content ──────────────────────────────────────────── */}
          <section className="space-y-7">
            {Object.entries(groupedPrescriptables).map(([key, items]) => {
              const type = key as TPrescriptableType;
              const title =
                type === "dosage"
                  ? "الأدوية"
                  : type === "analysis"
                    ? "التحاليل المطلوبة"
                    : "الأشعة والتصوير";

              return (
                <div key={type} className="space-y-3">
                  <h3 className="border-b border-blue-100 pb-1.5 text-lg font-bold text-blue-800">
                    {title}
                  </h3>
                  <div className="space-y-2.5">
                    {items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-gray-200 bg-white p-3.5 shadow-sm transition-shadow hover:shadow"
                      >
                        <div className="font-medium text-gray-900">
                          {item.name}
                        </div>
                        {item.drug_name && item.drug_name !== item.name && (
                          <div className="mt-1 text-sm text-gray-600">
                            {item.drug_name}
                          </div>
                        )}
                        {/* You can add dosage / frequency / duration fields here later */}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {prescription.note && (
              <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-4">
                <h3 className="mb-2 text-lg font-bold text-amber-800">
                  ملاحظات وتوصيات
                </h3>
                <p className="leading-relaxed whitespace-pre-line text-gray-800">
                  {prescription.note}
                </p>
              </div>
            )}
          </section>

          {/* Footer ─────────────────────────────────────────────────────────── */}
          <footer className="// أو حسب اللي يناسبك absolute right-8 bottom-6 left-8 border-t pt-4 text-center text-xs text-gray-500">
            <p>
              برجاء التواصل مع د/ {prescription.doctor.name} عبر{" "}
              {prescription.clinic.name}
            </p>
            <p className="mt-1">
              تم إصدار الروشتة في {formatDateTime(prescription.date)}
            </p>
          </footer>

          {/* Optional very light watermark */}
          <div className="pointer-events-none absolute inset-0 flex -rotate-12 items-center justify-center text-[12rem] font-black text-blue-950 opacity-[0.03] select-none">
            روشتة
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintPrescriptionReceipt;
