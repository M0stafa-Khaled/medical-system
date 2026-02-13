import { Badge } from "@/components/ui/badge";
import { IClinic } from "@/interfaces/dashboard/clinics";
import { useNavigate } from "react-router";

interface IProps {
  clinic: IClinic;
}

const ClinicCard = ({ clinic: { id, name, status } }: IProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="border-primary/30 from-card dark:border-primary/50 dark:from-foreground dark:via-background dark:to-muted cursor-pointer rounded-lg border bg-linear-to-br via-sky-50 to-white p-6 shadow-md"
      onClick={() =>
        navigate(`/doctor/clinic/${name}/bookings`, { state: { clinicId: id } })
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-dark font-medium dark:text-white/90">
            اسم العيادة
          </span>
          <span className="text-dark text-lg font-semibold dark:text-white">
            {name}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-dark font-medium dark:text-white/90">
            الحالة
          </span>
          {status ? (
            <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
              <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
              نشطة
            </Badge>
          ) : (
            <Badge className="rounded-full bg-red-600/30 text-red-500 shadow-none hover:bg-red-600/10 dark:bg-red-600/20">
              <div className="ml-2 h-1.5 w-1.5 rounded-full bg-red-500" />
              غير نشطة
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicCard;
