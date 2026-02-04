import { Badge } from "@/components/ui/badge";
import { IClinic } from "@/interfaces/dashboard/clinics";
import { useNavigate } from "react-router-dom";

interface IProps {
  clinic: IClinic;
}

const ClinicCard = ({ clinic: { id, name, status } }: IProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer rounded-lg border border-primary/30 bg-linear-to-br from-card via-sky-50 to-white dark:border-primary/50 dark:from-foreground dark:via-background dark:to-muted p-6 shadow-md"
      onClick={() =>
        navigate(`/doctor/clinic/${name}/bookings`, { state: { clinicId: id } })
      }
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center gap-2">
          <span className="font-medium text-dark dark:text-white/90">
            اسم العيادة
          </span>
          <span className="text-lg font-semibold text-dark dark:text-white">
            {name}
          </span>
        </div>
        <div className="flex justify-between items-center gap-2">
          <span className="font-medium text-dark dark:text-white/90">
            الحالة
          </span>
          {status ? (
            <Badge className="bg-emerald-600/30 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-800 dark:text-emerald-500 shadow-none rounded-full">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500 ml-2" />
              نشطة
            </Badge>
          ) : (
            <Badge className="bg-red-600/30 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 shadow-none rounded-full">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500 ml-2" />
              غير نشطة
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicCard;
