import { type ColumnDef } from "@/components/shared/data-table";
import { type IDoctor } from "../types";
import { type IPaginationMeta } from "@/shared/types";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import countSerial from "@/shared/utils/countSerial";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import truncateText from "@/shared/utils/truncateText";
import { Badge } from "@/shared/components/ui/badge";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router";
import { FiEye } from "react-icons/fi";
import { Pen } from "lucide-react";
import { DeleteAlert } from "@/components/shared/delete-alert";
import { useDeleteDoctor } from "../queriesAndMutations";

export const useDoctorsColumns = ({
  meta,
}: {
  meta?: IPaginationMeta;
}): ColumnDef<IDoctor>[] => {
  const canUpdateDoctor = useHasPermission(PERMISSIONS.UPDATE_DOCTOR);
  const canDeleteDoctor = useHasPermission(PERMISSIONS.DELETE_DOCTOR);
  const canViewDoctor = useHasPermission(PERMISSIONS.VIEW_DOCTOR);

  const { mutateAsync: deleteDoctor } = useDeleteDoctor();
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
          <AvatarFallback>
            {row.name
              .split(" ")
              .map((name) => name[0].toUpperCase())
              .join("")}
          </AvatarFallback>
        </Avatar>
      ),
    },
    {
      key: "name",
      header: "اسم الطبيب",
      cell: (row) => truncateText(row.name, 15),
    },
    {
      key: "first_phone",
      header: "رقم الهاتف",
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
    ...(canUpdateDoctor || canDeleteDoctor || canViewDoctor
      ? [
          {
            key: "actions" as const,
            header: "الاجراءات",
            cell: (row: IDoctor) => (
              <div className="flex items-center justify-center gap-2">
                {canViewDoctor && (
                  <TooltipButton title="عرض">
                    <Button
                      asChild
                      variant={"outline"}
                      size={"icon"}
                      className="btn-primary rounded-full"
                    >
                      <Link to={`/dashboard/doctors/${row.id}`}>
                        <FiEye size={24} />
                      </Link>
                    </Button>
                  </TooltipButton>
                )}
                {canUpdateDoctor && (
                  <TooltipButton title="تعديل">
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className="btn-edit rounded-full"
                    >
                      <Link to={`/dashboard/doctors/${row.id}/update`}>
                        <Pen size={20} />
                      </Link>
                    </Button>
                  </TooltipButton>
                )}
                {canDeleteDoctor && (
                  <DeleteAlert
                    name={row.name}
                    deleteAction={() => deleteDoctor({ id: row.id })}
                  />
                )}
              </div>
            ),
          },
        ]
      : []),
  ];
};
