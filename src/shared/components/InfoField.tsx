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
    <div className="flex items-center gap-3">
      {icon && (
        <div className="text-muted-foreground flex h-4 w-4 items-center justify-center">
          {icon}
        </div>
      )}
      <div className="flex flex-col">
        <h5 className="text-muted-foreground text-sm font-medium">{label}</h5>
        <p
          className={`font-medium ${sm ? "text-sm" : "text-base"} ${breakAll && "break-all"}`}
        >
          {value || "غير محدد"}
        </p>
      </div>
    </div>
  );
};

export default InfoField;
