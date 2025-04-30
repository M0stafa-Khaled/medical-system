import InfoField from "@/components/dashboard/InfoField";
import { IWorkingDay } from "@/interfaces/dashboard/doctors/workingDays";
import { convertDayFromEnToAr } from "@/utils/convertDayLang";
import { Calendar, Clock, Hospital, Users } from "lucide-react";

interface IProps {
  day: IWorkingDay;
}
const DoctorWorkingDayCard = ({
  day: { day, clinic, start_at, end_at, deuration, max_visitors },
}: IProps) => {
  return (
    <div className="space-y-2 mb-5">
      <div className="text-black dark:text-white break-words break-all flex flex-row justify-between items-center gap-2">
        <h2 className="flex justify-center items-center gap-2">
          <Calendar className="w-5 h-5" />
          {convertDayFromEnToAr(day)}
        </h2>
        <h3 className="flex justify-center items-center gap-2 font-medium">
          <span>{clinic.name}</span>
          <Hospital className="w-4 h-4" />
        </h3>
      </div>
      <div className="space-y-1.5">
        <InfoField
          label="وقت العمل"
          value={`من ${start_at} إلى ${end_at}`}
          icon={<Clock className="w-4 h-4 flex-shrink-0" />}
        />
        <InfoField
          label="مدة الكشف"
          value={`${deuration} دقيقة`}
          icon={<Calendar className="w-4 h-4" />}
        />
        <InfoField
          label="الحد الأقصى"
          value={`${max_visitors} أشخاص`}
          icon={<Users className="w-4 h-4" />}
        />
      </div>
    </div>
  );
};

export default DoctorWorkingDayCard;
