import type { ColumnDef } from "@/shared/components/data-table";
import { DeleteAlert } from "@/shared/components/delete-alert";
import { PERMISSIONS } from "@/shared/enums/permissions";
import type { IPrescription } from "@/features/dashboard/prescriptions/types";
import { Button } from "@/shared/components/ui/button";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import useHasPermission from "@/shared/hooks/useHasPermission";
import type { IPaginationMeta } from "@/shared/types";
import formatDateTime from "@/shared/utils/formatDate";
import truncateText from "@/shared/utils/truncateText";
import { Eye, Pen } from "lucide-react";
import { Link } from "react-router";
import PrintPrescriptionReceipt from "./PrintPrescriptionReceipt";
import { useDeletePrescription } from "@/features/dashboard/prescriptions/queriesAndMutations.ts";
import countSerial from "@/shared/utils/countSerial";

export const usePrescriptionsColumns = ({
  meta,
}: {
  meta?: IPaginationMeta;
}): ColumnDef<IPrescription>[] => {
  const canUpdatePrescription = useHasPermission(
    PERMISSIONS.UPDATE_PRESCRIPTION
  );
  const canDeletePrescription = useHasPermission(
    PERMISSIONS.DELETE_PRESCRIPTION
  );
  const canViewPrescription = useHasPermission(PERMISSIONS.VIEW_PRESCRIPTION);

  const { mutateAsync: deletePrescription } = useDeletePrescription();

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
      key: "doctor.name" as keyof IPrescription,
      header: "الطبيب",
      cell: (row) => truncateText(row.doctor?.name, 15),
    },
    {
      key: "clinic.name" as keyof IPrescription,
      header: "العيادة",
    },
    {
      key: "date",
      header: "تاريخ الإنشاء",
      cell: (row) => formatDateTime(row.date),
    },
    {
      key: "note",
      header: "الملاحظات",
      cell: (row) => truncateText(row.note || "لا يوجد", 20),
    },
    ...(canUpdatePrescription || canDeletePrescription || canViewPrescription
      ? [
          {
            key: "actions" as const,
            header: "الاجراءات",
            cell: (row: IPrescription) => (
              <div className="flex items-center justify-center gap-2">
                {canViewPrescription && (
                  <TooltipButton title="عرض">
                    <Button
                      asChild
                      size={"icon"}
                      className="btn-primary rounded-full"
                    >
                      <Link to={`/dashboard/prescriptions/${row.id}`}>
                        <Eye size={20} />
                      </Link>
                    </Button>
                  </TooltipButton>
                )}
                {canViewPrescription && (
                  <PrintPrescriptionReceipt prescription={row} />
                )}

                {canUpdatePrescription && (
                  <TooltipButton title="تعديل">
                    <Button
                      size={"icon"}
                      asChild
                      className="btn-edit rounded-full"
                    >
                      <Link to={`/dashboard/prescriptions/${row.id}/update`}>
                        <Pen size={20} />
                      </Link>
                    </Button>
                  </TooltipButton>
                )}
                {canDeletePrescription && (
                  <DeleteAlert
                    name={`روشتة المريض ${row?.patient?.name}`}
                    deleteAction={() =>
                      deletePrescription({ id: row.id.toString() })
                    }
                  />
                )}
              </div>
            ),
          },
        ]
      : []),
  ];
};
