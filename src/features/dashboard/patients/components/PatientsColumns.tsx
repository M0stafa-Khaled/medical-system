import { ColumnDef } from "@/shared/components/data-table";
import { DeleteAlert } from "@/shared/components/delete-alert";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { IPatient } from "@/features/dashboard/patients/types";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { IPaginationMeta } from "@/shared/types";
import countSerial from "@/shared/utils/countSerial";
import truncateText from "@/shared/utils/truncateText";
import { Pen } from "lucide-react";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router";
import { useDeletePatient } from "../queriesAndMutations";

export const usePatientsColumns = ({
  meta,
}: {
  meta?: IPaginationMeta;
}): ColumnDef<IPatient>[] => {
  const canUpdatePatient = useHasPermission(PERMISSIONS.UPDATE_PATIENT);
  const canDeletePatient = useHasPermission(PERMISSIONS.DELETE_PATIENT);
  const canViewPatient = useHasPermission(PERMISSIONS.VIEW_PATIENT);

  const { mutateAsync: deletePatient } = useDeletePatient();
  return [
    {
      key: "id",
      header: "#",
      cell: (_, index) => countSerial({ meta: meta!, index: index || 0 }),
    },
    {
      key: "name",
      header: "اسم المريض",
      cell: (row) => truncateText(row.name, 20),
    },
    {
      key: "first_phone",
      header: "رقم الهاتف",
    },
    {
      key: "another_name",
      header: "اسم أحد الأقارب",
      cell: (row) => truncateText(row.another_name, 20),
    },
    {
      key: "second_phone",
      header: "رقم الهاتف الثاني",
    },
    {
      key: "personal_id",
      header: "رقم الملف",
    },
    {
      key: "status",
      header: "حالة الحساب",
      cell: (row) =>
        row.status ? (
          <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
            نشط
          </Badge>
        ) : (
          <Badge className="rounded-full bg-red-600/30 text-nowrap text-red-500 shadow-none hover:bg-red-600/10 dark:bg-red-600/20">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            غير نشط
          </Badge>
        ),
    },
    ...(canDeletePatient || canUpdatePatient || canViewPatient
      ? [
          {
            key: "actions" as const,
            header: "الاجراءات",
            cell: (row: IPatient) => (
              <div className="flex items-center justify-center gap-2">
                {canViewPatient && (
                  <TooltipButton title="عرض">
                    <Button
                      size={"icon"}
                      asChild
                      className="btn-primary rounded-full"
                    >
                      <Link to={`/dashboard/patients/${row.id}`}>
                        <FiEye />
                      </Link>
                    </Button>
                  </TooltipButton>
                )}
                {canUpdatePatient && (
                  <TooltipButton title="تعديل">
                    <Button
                      asChild
                      size={"icon"}
                      className="btn-edit rounded-full"
                    >
                      <Link to={`/dashboard/patients/${row.id}/update`}>
                        <Pen />
                      </Link>
                    </Button>
                  </TooltipButton>
                )}
                {canDeletePatient && (
                  <DeleteAlert
                    name={row.name}
                    deleteAction={() => deletePatient({ id: row.id! })}
                  />
                )}
              </div>
            ),
          },
        ]
      : []),
  ];
};
