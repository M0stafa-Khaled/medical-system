import { ColumnDef } from "@/shared/components/data-table";
import { ITransfer } from "../../types";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import formatDateTime from "@/shared/utils/formatDate";

export const useTransfersReportColumns = (): ColumnDef<ITransfer>[] => {
  return [
    {
      key: "from_treasury.name" as keyof ITransfer,
      header: "من الخزنة",
    },
    {
      key: "to_treasury.name" as keyof ITransfer,
      header: "إلي الخزنة",
    },
    {
      key: "amount",
      header: "الميلغ",
      cell: (row) => numberToPrice(row.amount),
    },
    {
      key: "created_at",
      header: "تاريخ التحويل",
      cell: (row) => formatDateTime(row.created_at),
    },
  ];
};
