import { ReactNode } from "react";

interface IProps {
  label: string;
  value: string | number;
  sm?: boolean;
  icon?: ReactNode;
  breakAll?: boolean;
}

const InfoField = ({ label, value, sm, icon, breakAll }: IProps) => {
  return (
    <div className="flex items-center gap-4">
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <div className="flex items-center gap-2">
        <h5 className="text-sm text-muted-foreground text-nowrap">{label}:</h5>
        <p
          className={`font-medium text-wrap ${sm && "text-sm"} ${
            breakAll && "break-all"
          }`}
        >
          {value || "لا يوجد"}
        </p>
      </div>
    </div>
  );
};

export default InfoField;
