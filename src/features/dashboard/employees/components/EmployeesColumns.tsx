import { ColumnDef } from "@/shared/components/data-table";
import { Badge } from "@/shared/components/ui/badge";
import { PERMISSIONS } from "@/shared/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { type IEmployee } from "../types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { Button } from "@/shared/components/ui/button";
import { Pen } from "lucide-react";
import { FiEye } from "react-icons/fi";
import truncateText from "@/shared/utils/truncateText";
import countSerial from "@/shared/utils/countSerial";
import { Link } from "react-router";
import { type IPaginationMeta } from "@/shared/types";
import { DeleteAlert } from "@/shared/components/delete-alert";
import { useDeleteEmployee } from "../queriesAndMutations";

export const useEmployeesColumns = ({
  meta,
}: {
  meta?: IPaginationMeta;
}): ColumnDef<IEmployee>[] => {
  const canUpdateEmployee = useHasPermission(PERMISSIONS.UPDATE_EMPLOYEE);
  const canDeleteEmployee = useHasPermission(PERMISSIONS.DELETE_EMPLOYEE);
  const canViewEmployee = useHasPermission(PERMISSIONS.VIEW_EMPLOYEE);

  const { mutateAsync: deleteEmployee } = useDeleteEmployee();

  return [
    {
      key: "id",
      header: "#",
      cell: (_, index) => countSerial({ meta: meta!, index: index || 0 }),
    },
    {
      key: "image",
      header: "الصورة الشخصية",
      cell: (row) => (
        <Avatar className="mx-auto">
          <AvatarImage src={row.image || ""} alt={row.name} />
          <AvatarFallback>{row.name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      ),
    },
    {
      key: "name",
      header: "اسم الموظف",
      cell: (row) => truncateText(row?.name, 20),
    },
    {
      key: "first_phone",
      header: "رقم الهاتف",
    },
    {
      key: "status",
      header: "الحالة",
      cell: (row) => (
        <>
          {row.status ? (
            <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
              <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
              نشط
            </Badge>
          ) : (
            <Badge className="rounded-full bg-red-600/30 text-red-500 shadow-none hover:bg-red-600/10 dark:bg-red-600/20">
              <div className="ml-2 h-1.5 w-1.5 rounded-full bg-red-500" />
              غير نشط
            </Badge>
          )}
        </>
      ),
    },
    ...(canUpdateEmployee || canDeleteEmployee || canViewEmployee
      ? [
          {
            key: "actions" as const,
            header: "الاجراءات",
            cell: (row: IEmployee) => (
              <div className="flex items-center justify-center gap-2">
                {canViewEmployee && (
                  <TooltipButton title="عرض">
                    <Button
                      asChild
                      variant={"outline"}
                      size={"icon"}
                      className="btn-primary rounded-full"
                    >
                      <Link to={`/dashboard/employees/${row.id}`}>
                        <FiEye size={24} />
                      </Link>
                    </Button>
                  </TooltipButton>
                )}
                {canUpdateEmployee && (
                  <TooltipButton title="تعديل">
                    <Button
                      asChild
                      variant={"outline"}
                      size={"icon"}
                      className="btn-edit rounded-full"
                    >
                      <Link to={`/dashboard/employees/${row.id}/update`}>
                        <Pen size={20} />
                      </Link>
                    </Button>
                  </TooltipButton>
                )}
                {canDeleteEmployee && (
                  <DeleteAlert
                    deleteAction={() => deleteEmployee({ id: row.id })}
                    name={row.name}
                    navigatePath="/dashboard/employees"
                  />
                )}
              </div>
            ),
          },
        ]
      : []),
  ];
};
