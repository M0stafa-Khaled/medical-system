import { ColumnDef } from "@/shared/components/data-table";
import { IScan } from "../types";
import countSerial from "@/shared/utils/countSerial";
import { IPaginationMeta } from "@/shared/types";

export const useScansColumns = ({
  meta,
}: {
  meta?: IPaginationMeta;
}): ColumnDef<IScan>[] => {
  return [
    {
      key: "id",
      header: "#",
      cell: (_, index) => countSerial({ meta: meta!, index: index || 0 }),
    },
    {
      key: "name",
      header: "اسم الأشعة",
    },
    {
      key: "arabic_name",
      header: "الاسم بالعربي",
    },
    {
      key: "abbreviation",
      header: "الإختصار",
    },
  ];
};
