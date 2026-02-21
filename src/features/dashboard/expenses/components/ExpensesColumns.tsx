import { ColumnDef } from "@/shared/components/data-table";
import { type IExpense } from "../types";
import { Link } from "react-router";
import truncateText from "@/shared/utils/truncateText";
import { Badge } from "@/shared/components/ui/badge";
import formatDateTime from "@/shared/utils/formatDate";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { Button } from "@/shared/components/ui/button";
import { FiEye } from "react-icons/fi";
import { PrintExpenseReceipt } from "./PrintExpenseReceipt";
import { CancelExpense } from "./CancelExpense";
import { DeleteAlert } from "@/shared/components/delete-alert";
import { useDeleteExpense } from "../queriesAndMutations";

export const useExpensesColumns = (): ColumnDef<IExpense>[] => {
  const canDeleteExpense = useHasPermission(
    PERMISSIONS.DELETE_EXPENSE_CATEGORY
  );
  const canCancelExpense = useHasPermission(PERMISSIONS.CANCEL_EXPENSE);
  const canViewExpense = useHasPermission(PERMISSIONS.VIEW_EXPENSE_CATEGORY);

  const { mutateAsync: deleteExpense } = useDeleteExpense();

  return [
    {
      key: "code",
      header: "رقم العملية",
    },
    {
      key: "category.name" as keyof IExpense,
      header: "القسم",
    },
    {
      key: "price",
      header: "المبلغ",
    },
    {
      key: "treasury.name" as keyof IExpense,
      header: "الخزنة",
    },
    {
      key: "employee.name" as keyof IExpense,
      header: "الموظف",
      cell: (row) => (
        <Link
          to={`/dashboard/employees/${row?.employee.id}`}
          className="transition-all duration-200 dark:hover:text-blue-500"
        >
          {truncateText(row?.employee?.name, 15)}
        </Link>
      ),
    },
    {
      key: "status",
      header: "الحالة",
      cell: (row) =>
        row.status ? (
          <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
            معتمد
          </Badge>
        ) : (
          <Badge className="rounded-full bg-red-600/30 text-red-500 shadow-none hover:bg-red-600/10 dark:bg-red-600/20">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            ملغي
          </Badge>
        ),
    },
    {
      key: "created_at",
      header: "التاريخ",
      cell: (row) => formatDateTime(row?.created_at),
    },
    ...(canViewExpense || canCancelExpense || canDeleteExpense
      ? [
          {
            key: "actions" as const,
            header: "الاجراءات",

            cell: (row: IExpense) => (
              <div className="flex items-center justify-center gap-2">
                {canViewExpense && (
                  <TooltipButton title="عرض">
                    <Button
                      className="btn-primary rounded-full"
                      asChild
                      size={"icon"}
                    >
                      <Link to={`/dashboard/expenses/${row?.id}`}>
                        <FiEye size={24} />
                      </Link>
                    </Button>
                  </TooltipButton>
                )}
                {canViewExpense && <PrintExpenseReceipt expense={row} />}
                {canCancelExpense && row?.status && (
                  <CancelExpense id={row?.id} />
                )}
                {canDeleteExpense && !row?.status && (
                  <DeleteAlert
                    name={row?.name}
                    deleteAction={() =>
                      deleteExpense({ id: row.id.toString() })
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
