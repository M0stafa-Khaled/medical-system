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

      document.title = `Prescription - ${prescription.patient.name} - ${formattedDate}`;
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
          size={"icon"}
          className="btn-primary rounded-full"
        >
          <FaPrint size={24} />
        </Button>
      </TooltipButton>
      <div
        dir="rtl"
        className="hidden p-6 print:block print:text-black"
        ref={contentRef}
      >
        <div className="relative mx-auto min-h-[297mm] w-[210mm] overflow-hidden rounded-xl border border-gray-300 bg-white p-6 shadow-lg">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between border-b-2 border-gray-400 pb-4">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="rounded-full p-2">
                <img
                  src="/images/logo.svg"
                  alt="logo"
                  className="h-12 w-12 object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Modern Clinic
                </h1>
                <p className="text-sm text-gray-600">
                  Medical & Healthcare Services
                </p>
              </div>
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-gray-800">
                Dr. {prescription.doctor.name}
              </h2>
              <p className="text-sm text-gray-600">
                {prescription.doctor.first_phone || ""}
              </p>
            </div>
          </div>
          {/* Patient Info */}
          <div className="mb-6 grid grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">اسم المريض:</span>
              <span>{prescription.patient.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">التاريخ:</span>
              <span>{formatDateTime(prescription.date)}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">العيادة:</span>
              <span>{prescription.clinic.name}</span>
            </div>
          </div>
          {/* Main Content */}
          <div className="space-y-6 rounded-lg bg-gray-50 p-4">
            {Object.keys(groupedPrescriptables).map((key) => {
              const type = key as TPrescriptableType;
              return (
                <div key={type}>
                  <h3 className="mb-2 text-lg font-bold text-blue-600">
                    {type === "dosage"
                      ? "الادوية"
                      : type === "analysis"
                        ? "تحاليل"
                        : "اشعات"}
                  </h3>
                  <ul className="space-y-2">
                    {groupedPrescriptables[type]?.map((item, index) => (
                      <li
                        key={index}
                        className="rounded-md bg-white p-3 shadow-xs"
                      >
                        <p className="font-semibold text-gray-800">
                          {item.name}
                        </p>
                        {item.drug_name && (
                          <p className="text-sm text-gray-500">
                            {item.drug_name}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            {prescription.note && (
              <div className="rounded-md bg-white p-3 shadow-xs">
                <h3 className="mb-1 text-lg font-bold text-gray-800">
                  ملاحظات
                </h3>
                <p className="text-gray-600">{prescription.note}</p>
              </div>
            )}
          </div>
          {/* Footer */}
          <div className="absolute right-6 bottom-6 left-6 border-t pt-4 text-center text-xs text-gray-500">
            <p>
              Contact Dr. {prescription.doctor.name} at{" "}
              {prescription.clinic.name}
            </p>
            <p className="mt-1">{prescription.clinic.created_at}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintPrescriptionReceipt;
