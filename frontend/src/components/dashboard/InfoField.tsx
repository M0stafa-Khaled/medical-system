interface IProps {
  label: string;
  value: string | number | undefined;
  sm?: boolean;
}
const InfoField = ({ label, value, sm }: IProps) => {
  return (
    <div className="flex items-center gap-2">
      <h5 className="text-sm text-muted-foreground">{label}:</h5>
      <p className={`font-medium break-all ${sm && "text-sm"}`}>{value}</p>
    </div>
  );
};

export default InfoField;
