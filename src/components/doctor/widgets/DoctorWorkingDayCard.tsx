import InfoField from "@/components/shared/InfoField";
import { IWorkingDay } from "@/interfaces/dashboard/doctors/workingDays";
import { convertDayFromEnToAr } from "@/shared/utils/convertDayLang";
import { Calendar, Clock, Hospital, Users } from "lucide-react";

interface IProps {
  day: IWorkingDay;
}
const DoctorWorkingDayCard = ({
  day: { day, clinic, start_at, end_at, deuration, max_visitors },
}: IProps) => {
  return (
    <div className="mb-5 space-y-2">
      <div className="flex flex-row items-center justify-between gap-2 wrap-break-word break-all text-black dark:text-white">
        <h2 className="flex items-center justify-center gap-2">
          <Calendar className="h-5 w-5" />
          {convertDayFromEnToAr(day)}
        </h2>
        <h3 className="flex items-center justify-center gap-2 font-medium">
          <span>{clinic.name}</span>
          <Hospital className="h-4 w-4" />
        </h3>
      </div>
      <div className="space-y-1.5">
        <InfoField
          label="وقت العمل"
          value={`من ${start_at} إلى ${end_at}`}
          icon={<Clock className="h-4 w-4 shrink-0" />}
        />
        <InfoField
          label="مدة الكشف"
          value={`${deuration} دقيقة`}
          icon={<Calendar className="h-4 w-4" />}
        />
        <InfoField
          label="الحد الأقصى"
          value={`${max_visitors} أشخاص`}
          icon={<Users className="h-4 w-4" />}
        />
      </div>
    </div>
  );
};

export default DoctorWorkingDayCard;
