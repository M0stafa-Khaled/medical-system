import type { ColumnDef } from "@/shared/components/data-table";
import { DeleteAlert } from "@/shared/components/delete-alert";
import type { IPrescription } from "@/features/dashboard/prescriptions/types";
import { Button } from "@/shared/components/ui/button";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import type { IPaginationMeta } from "@/shared/types";
import formatDateTime from "@/shared/utils/formatDate";
import truncateText from "@/shared/utils/truncateText";
import { Eye, Pen } from "lucide-react";
import { Link } from "react-router";
import countSerial from "@/shared/utils/countSerial";
import PrintPrescriptionReceipt from "@/features/dashboard/prescriptions/components/PrintPrescriptionReceipt";
import { useDeleteDoctorPrescription } from "../../queriesAndMutations";

export const useDoctorPrescriptionsColumns = ({
  meta,
}: {
  meta?: IPaginationMeta;
}): ColumnDef<IPrescription>[] => {
  const { mutateAsync: deletePrescription } = useDeleteDoctorPrescription();

  return [
    {
      key: "id",
      header: "#",
      cell: (_, index) => countSerial({ meta: meta!, index: index || 0 }),
    },
    {
      key: "patient.name" as keyof IPrescription,
      header: "المريض",
      cell: (row) => truncateText(row.patient?.name, 20),
    },
    {
      key: "clinic.name" as keyof IPrescription,
      header: "العيادة",
    },
    {
      key: "date",
      header: "تاريخ الإنشاء",
      cell: (row) =>
        formatDateTime(row.date, {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    },
    {
      key: "note",
      header: "الملاحظات",
      cell: (row) => truncateText(row.note || "لا يوجد", 30),
    },

    {
      key: "actions" as const,
      header: "الاجراءات",
      cell: (row: IPrescription) => (
        <div className="flex items-center justify-center gap-2">
          <TooltipButton title="عرض">
            <Button asChild size={"icon"} className="btn-primary rounded-full">
              <Link to={`/doctor/prescriptions/${row.id}`}>
                <Eye size={20} />
              </Link>
            </Button>
          </TooltipButton>

          <PrintPrescriptionReceipt prescription={row} />

          <TooltipButton title="تعديل">
            <Button size={"icon"} asChild className="btn-edit rounded-full">
              <Link to={`/doctor/prescriptions/${row.id}/update`}>
                <Pen size={20} />
              </Link>
            </Button>
          </TooltipButton>

          <DeleteAlert
            name={`روشتة المريض ${row?.patient?.name}`}
            deleteAction={() => deletePrescription({ id: row.id.toString() })}
          />
        </div>
      ),
    },
  ];
};
