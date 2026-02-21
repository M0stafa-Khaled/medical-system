import { ReactNode } from "react";
import { useNavigate } from "react-router";

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
      className="bg-card text-card-foreground dark:border-border/20 cursor-pointer rounded-xl border shadow-sm"
      onClick={() => navigate(path)}
    >
      <div className="flex flex-row items-center justify-between gap-4 space-y-0 p-6 pb-2">
        <div className="text-sm font-medium tracking-tight">{title}</div>
        {icon}
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
};

export default WidgetCard;
