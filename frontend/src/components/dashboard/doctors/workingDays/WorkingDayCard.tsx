import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteWorkingDay from "./DeleteWorkingDay";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { IWorkingDay } from "@/interfaces/dashboard/doctors/workingDays";
import { Clock, Users, Hospital, Calendar, Pen } from "lucide-react";
import convertDay, { convertDayFromEnToAr } from "@/utils/convertDayLang";
import InfoField from "../../InfoField";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface IProps {
  day: IWorkingDay;
  doctorId: string;
}
const WorkingDayCard = ({
  day: { clinic, day, deuration, end_at, id, max_visitors, start_at },
  doctorId,
}: IProps) => {
  const canDeleteAction = useHasPermission(PERMISSIONS.DELETE_ACTION_DOCTOR);
  const canUpdateAction = useHasPermission(PERMISSIONS.UPDATE_ACTION_DOCTOR);

  return (
    <Card className="border-muted bg-background dark:bg-dark hover:shadow-lg transition-shadow duration-300">
      <div>
        <CardHeader className="p-4">
          <CardTitle className="text-lg text-black dark:text-white break-words break-all flex flex-row justify-between items-center gap-2">
            <h2 className="flex justify-center items-center gap-2">
              <Calendar className="w-5 h-5" />
              {convertDayFromEnToAr(day)}
            </h2>
            <h3 className="flex justify-center items-center gap-2 font-medium">
              <Hospital className="w-4 h-4" />
              <span>{clinic.name}</span>
            </h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-3">
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
        </CardContent>
      </div>
      {(canDeleteAction || canUpdateAction) && (
        <div className="flex px-4 gap-2 mb-3">
          {canDeleteAction && (
            <DeleteWorkingDay id={id} name={convertDay(day, "en")} />
          )}
          {canUpdateAction && (
            <Button className="h-auto py-0 px-0 bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm">
              <Link
                to={`/dashboard/doctors/${doctorId}/working-days/update/${id}`}
                className="flex justify-center items-center gap-2 py-1 px-1 w-9 h-9"
              >
                <Pen size={20} />
              </Link>
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default WorkingDayCard;
