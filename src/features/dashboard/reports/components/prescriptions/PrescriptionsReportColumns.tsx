import { IPrescription } from "@/features/dashboard/prescriptions/types";
import { ColumnDef } from "@/shared/components/data-table";
import formatDateTime from "@/shared/utils/formatDate";

export const usePrescriptionsReportColumns = (): ColumnDef<IPrescription>[] => {
  return [
    {
      key: "id",
      header: "رقم الطلب",
    },
    {
      key: "patient.name" as keyof IPrescription,
      header: "اسم المريض",
    },
    {
      key: "doctor.name" as keyof IPrescription,
      header: "اسم الطبيب",
    },
    {
      key: "clinic.name" as keyof IPrescription,
      header: "العيادة",
    },
    {
      key: "date",
      header: "التاريخ",
      cell: (row) => formatDateTime(row.date),
    },
    {
      key: "note",
      header: "ملاحظات",
      cell: (row) => row.note || "لا يوجد ملاحظات",
    },
    {
      key: "prescriptables",
      header: "عدد الأدوية",
      cell: (row) => row.prescriptables?.length || 0,
    },
  ];
};
