import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { FaPrint } from "react-icons/fa6";
import {
  IPrescriptable,
  IPrescription,
} from "@/interfaces/dashboard/prescription";
import formatDateTime from "@/utils/formatDate";
import { TPrescriptableType } from "@/types";
import TooltipButton from "@/components/ui/TooltipButton";
import { Button } from "@/components/ui/button";

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
          className="text-sm text-white bg-blue-600 hover:bg-blue-700 h-9 w-9"
        >
          <FaPrint size={24} />
        </Button>
      </TooltipButton>
      <div
        dir="rtl"
        className="hidden p-6 print:block print:text-black"
        ref={contentRef}
      >
        <div className="relative p-6 mx-auto overflow-hidden bg-white border border-gray-300 rounded-xl shadow-lg w-[210mm] min-h-[297mm]">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-gray-400">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="p-2 rounded-full">
                <img
                  src="/images/logo.svg"
                  alt="logo"
                  className="w-12 h-12 object-contain"
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
          <div className="grid grid-cols-3 gap-4 mb-6 text-sm text-gray-700">
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
          <div className="p-4 bg-gray-50 rounded-lg space-y-6">
            {Object.keys(groupedPrescriptables).map((key) => {
              const type = key as TPrescriptableType;
              return (
                <div key={type}>
                  <h3 className="font-bold text-lg mb-2 text-blue-600">
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
                        className="p-3 bg-white rounded-md shadow-xs"
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
              <div className="p-3 bg-white rounded-md shadow-xs">
                <h3 className="font-bold text-lg mb-1 text-gray-800">
                  ملاحظات
                </h3>
                <p className="text-gray-600">{prescription.note}</p>
              </div>
            )}
          </div>
          {/* Footer */}
          <div className="absolute bottom-6 left-6 right-6 text-xs text-center text-gray-500 border-t pt-4">
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
