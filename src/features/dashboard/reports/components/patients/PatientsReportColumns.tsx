import { IPatient } from "@/features/dashboard/patients/types";
import { ColumnDef } from "@/shared/components/data-table";
import { Badge } from "@/shared/components/ui/badge";
import formatDateTime from "@/shared/utils/formatDate";

export const usePatientsReportColumns = (): ColumnDef<IPatient>[] => {
  return [
    {
      key: "name",
      header: "اسم المريض",
    },
    {
      key: "first_phone",
      header: "رقم الهاتف",
    },
    {
      key: "status" as keyof IPatient,
      header: "حالة الحساب",
      cell: (row) =>
        row.status ? (
          <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
            مفعل
          </Badge>
        ) : (
          <Badge className="rounded-full bg-red-600/30 text-red-500 shadow-none hover:bg-red-600/10 dark:bg-red-600/20">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            غير مفعل
          </Badge>
        ),
    },
    {
      key: "personal_id",
      header: "رقم الهوية",
    },
    {
      key: "user.active" as keyof IPatient,
      header: "تأكيد الحساب",
      cell: (row) =>
        row.user.active ? (
          <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
            مؤكد
          </Badge>
        ) : (
          <Badge className="rounded-full bg-red-600/30 text-red-500 shadow-none hover:bg-red-600/10 dark:bg-red-600/20">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            غير مؤكد
          </Badge>
        ),
    },
    {
      key: "user.last_login_at" as keyof IPatient,
      header: "اخر تسيجل دخول",
      cell: (row) =>
        row.user.last_login_at
          ? formatDateTime(row.user.last_login_at)
          : "غير معروف",
    },
    {
      key: "user.last_logout_at" as keyof IPatient,
      header: "اخر تسيجل خروج",
      cell: (row) =>
        row.user.last_logout_at
          ? formatDateTime(row.user.last_logout_at)
          : "غير معروف",
    },
    {
      key: "created_at",
      header: "تاريخ التسجيل",
      cell: (row) => formatDateTime(row?.created_at),
    },
  ];
};
