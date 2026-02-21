import { IPrescriptable } from "../../types";

interface IProps {
  prescriptable: IPrescriptable;
}
export const PrescriptableCard = ({
  prescriptable: { name, type, drug_name },
}: IProps) => {
  return (
    <div className="bg-background border-primary/10 hover:border-primary/30 shadow-muted flex h-full flex-col justify-center space-y-2 rounded-lg border p-5 font-medium shadow-xs transition-all duration-500">
      <div className="flex items-center gap-2">
        <h4 className="text-muted-foreground">النوع: </h4>
        <p className="md:text-lg">
          {type === "scan" ? "أشعة" : type === "analysis" ? "تحليل" : "دواء"}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <h4 className="text-muted-foreground">
          {type === "scan"
            ? "اسم الأشعة"
            : type === "analysis"
              ? "اسم التحليل"
              : "اسم الجرعة"}
          :
        </h4>
        <p className="md:text-lg">{name}</p>
      </div>

      {drug_name && (
        <div className="flex items-center gap-2">
          <h4 className="text-muted-foreground text-nowrap">اسم الدواء:</h4>
          <p className="text-wrap wrap-break-word md:text-lg">{drug_name}</p>
        </div>
      )}
    </div>
  );
};
