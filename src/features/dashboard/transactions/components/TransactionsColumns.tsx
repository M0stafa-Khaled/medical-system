import { ColumnDef } from "@/shared/components/data-table";
import { ITransaction } from "../types";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import truncateText from "@/shared/utils/truncateText";
import { Badge } from "@/shared/components/ui/badge";
import formatDateTime from "@/shared/utils/formatDate";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router";
import { FiEye } from "react-icons/fi";
import PrintTransactionReceipt from "./PrintTransactionReceipt";
import { RefundTransaction } from "./RefundTransaction";

export const useTransactionsColumns = (): ColumnDef<ITransaction>[] => {
  const canRefundTransaction = useHasPermission(PERMISSIONS.REFUND_TRANSACTION);
  const canViewTransaction = useHasPermission(PERMISSIONS.VIEW_TRANSACTION);

  return [
    {
      key: "code",
      header: "رقم العملية",
    },
    {
      key: "balance.amount_paid" as keyof ITransaction,
      header: "المبلغ",
      cell: (row) => numberToPrice(row.balance.amount_paid),
    },
    {
      key: "treasury.name" as keyof ITransaction,
      header: "الخزنة",
    },
    {
      key: "actions",
      header: "الخدمة",
      cell: (row) => row.actions.map((action) => action.name).join(", "),
    },
    {
      key: "employee.name" as keyof ITransaction,
      header: "الموظف",
      cell: (row) => truncateText(row.employee.name, 25),
    },
    {
      key: "patient.name" as keyof ITransaction,
      header: "المريض",
      cell: (row) => truncateText(row.patient.name, 25),
    },
    {
      key: "status",
      header: "الحالة",
      cell: (row) =>
        row.status ? (
          <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
            محصل
          </Badge>
        ) : (
          <Badge className="rounded-full bg-red-600/30 text-red-500 shadow-none hover:bg-red-600/10 dark:bg-red-600/20">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            مسترد
          </Badge>
        ),
    },
    {
      key: "created_at",
      header: "تاريخ العملية",
      cell: (row) => formatDateTime(row.created_at),
    },
    ...(canRefundTransaction || canViewTransaction
      ? [
          {
            key: "actionss" as any,
            header: "الاجراءات",
            cell: (row: ITransaction) => (
              <div className="flex items-center justify-center gap-2">
                {canViewTransaction && (
                  <Button
                    asChild
                    size={"icon"}
                    className="btn-primary rounded-full"
                  >
                    <Link to={`/dashboard/transactions/${row?.id}`}>
                      <FiEye size={24} />
                    </Link>
                  </Button>
                )}
                {canViewTransaction && (
                  <PrintTransactionReceipt transaction={row} />
                )}

                {canRefundTransaction && row.status && (
                  <RefundTransaction code={row?.code} id={row?.id} />
                )}
              </div>
            ),
          },
        ]
      : []),
  ];
};
