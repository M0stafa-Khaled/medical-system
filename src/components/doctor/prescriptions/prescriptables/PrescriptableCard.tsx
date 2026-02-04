import { IPrescriptable } from "@/interfaces/dashboard/prescription";

interface IProps {
  prescriptable: IPrescriptable;
}
const PrescriptableCard = ({
  prescriptable: { name, type, drug_name },
}: IProps) => {
  return (
    <div className="h-full font-medium space-y-2 bg-background rounded-lg p-5 border border-primary/10 hover:border-primary/30 transition-all duration-500 shadow-xs shadow-muted flex justify-center flex-col">
      <div className="flex items-center gap-2">
        <h4 className="text-dark/80 dark:text-white/70">النوع: </h4>
        <p className="md:text-lg">
          {type === "scan" ? "أشعة" : type === "analysis" ? "تحليل" : "دواء"}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <h4 className="text-dark/80 dark:text-white/70">
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
          <h4 className="text-dark/80 dark:text-white/70 text-nowrap">
            اسم الدواء:
          </h4>
          <p className="md:text-lg text-wrap wrap-break-word">{drug_name}</p>
        </div>
      )}
    </div>
  );
};

export default PrescriptableCard;
