import { ColumnDef } from "@/shared/components/data-table";
import { IAnalysis } from "../types";
import countSerial from "@/shared/utils/countSerial";
import { IPaginationMeta } from "@/shared/types";

export const useAnalysisColumns = ({
  meta,
}: {
  meta?: IPaginationMeta;
}): ColumnDef<IAnalysis>[] => {
  return [
    {
      key: "id",
      header: "#",
      cell: (_, index) => countSerial({ meta: meta!, index: index || 0 }),
    },
    {
      key: "name",
      header: "اسم التحاليل",
    },
    {
      key: "arabic_name",
      header: "اسم التحاليل بالعربية",
    },
    {
      key: "abbreviation",
      header: "الاختصار",
    },
  ];
};
