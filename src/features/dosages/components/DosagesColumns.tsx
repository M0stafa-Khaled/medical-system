import { ColumnDef } from "@/shared/components/data-table";
import { IDosage } from "../types";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { useDeleteDosage } from "../queriesAndMutations";
import { UpdateDosage } from "./UpdateDosage";
import { DeleteAlert } from "@/shared/components/delete-alert";

export const useDosagesColumns = (): ColumnDef<IDosage>[] => {
  const canUpdateDosage = useHasPermission(PERMISSIONS.UPDATE_DOSAGE);
  const canDeleteDosage = useHasPermission(PERMISSIONS.DELETE_DOSAGE);

  const { mutateAsync: deleteDosage } = useDeleteDosage();
  return [
    {
      key: "id",
      header: "#",
      cell: (_, index) => index! + 1,
    },
    {
      key: "name",
      header: "اسم الجرعة",
    },
    ...(canUpdateDosage || canDeleteDosage
      ? [
          {
            key: "actions" as const,
            header: "الاجراءات",
            cell: (row: IDosage) => (
              <div className="flex items-center justify-center gap-2">
                {canUpdateDosage && (
                  <UpdateDosage name={row.name} id={row.id} />
                )}
                {canDeleteDosage && (
                  <DeleteAlert
                    name={row.name}
                    deleteAction={() => deleteDosage({ id: `${row.id}` })}
                  />
                )}
              </div>
            ),
          },
        ]
      : []),
  ];
};
