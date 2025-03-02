interface IProps {
  label: string;
  value: string | number;
  sm?: boolean;
  icon?: React.ReactNode;
}

const InfoField = ({ label, value, sm, icon }: IProps) => {
  return (
    <div className="flex items-center gap-4">
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <div className="flex items-center gap-2">
        <h5 className="text-sm text-muted-foreground">{label}:</h5>
        <p className={`font-medium break-all ${sm && "text-sm"}`}>
          {value || "لا يوجد"}
        </p>
      </div>
    </div>
  );
};

export default InfoField;
