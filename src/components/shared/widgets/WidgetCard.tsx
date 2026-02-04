import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  title: string;
  value: string;
  path: string;
  icon: ReactNode;
}

const WidgetCard = ({ icon, title, value, path }: IProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer rounded-xl border bg-card dark:bg-black text-card-foreground shadow-sm dark:border-primary/20"
      onClick={() => navigate(path)}
    >
      <div className="p-6 flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
        <div className="tracking-tight text-sm font-medium">{title}</div>
        {icon}
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
};

export default WidgetCard;
