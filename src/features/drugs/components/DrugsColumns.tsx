import { ColumnDef } from "@/shared/components/data-table";
import { IDrug } from "../types";
import { IPaginationMeta } from "@/shared/types";
import countSerial from "@/shared/utils/countSerial";

export const useDrugsColumns = ({
  meta,
}: {
  meta?: IPaginationMeta;
}): ColumnDef<IDrug>[] => {
  return [
    {
      key: "id" as any,
      header: "#",
      cell: (_, index) => countSerial({ meta: meta!, index: index || 0 }),
    },
    {
      key: "name",
      header: "اسم الدواء",
    },
    {
      key: "form",
      header: "نوع الدواء",
    },
  ];
};
