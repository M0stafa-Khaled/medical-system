import { UpdateClinic } from "./UpdateClinic";
import { ColumnDef } from "@/components/shared/data-table";
import { DeleteAlert } from "@/components/shared/delete-alert";
import { Badge } from "@/shared/components/ui/badge";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { type IClinic } from "../types";
import { useDeleteClinic } from "../queriesAndMutations";

export const useClinicsColumns = (): ColumnDef<IClinic>[] => {
  const canUpdateClinic = useHasPermission(PERMISSIONS.UPDATE_CLINIC);
  const canDeleteClinic = useHasPermission(PERMISSIONS.DELETE_CLINIC);

  const { mutateAsync: deleteClinic } = useDeleteClinic();

  return [
    {
      key: "id",
      header: "#",
      cell: (_, index) => index! + 1,
    },
    {
      key: "name",
      header: "اسم العيادة",
    },
    {
      key: "status",
      header: "الحالة",
      cell: (row) =>
        row.status ? (
          <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
            نشط
          </Badge>
        ) : (
          <Badge className="rounded-full bg-red-600/30 text-red-500 shadow-none hover:bg-red-600/10 dark:bg-red-600/20">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            غير نشط
          </Badge>
        ),
    },

    ...(canUpdateClinic || canDeleteClinic
      ? [
          {
            key: "actions" as const,
            header: "الاجراءات",
            cell: (row: IClinic) => (
              <div className="flex items-center justify-center gap-2">
                {canUpdateClinic && (
                  <UpdateClinic
                    name={row.name}
                    id={row.id}
                    status={row.status}
                    virtual_number={+row.virtual_number}
                  />
                )}
                {canDeleteClinic && (
                  <DeleteAlert
                    deleteAction={() => deleteClinic({ id: row.id })}
                    name={row.name}
                  />
                )}
              </div>
            ),
          },
        ]
      : []),
  ];
};
