import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import DeleteWorkingDay from "./DeleteWorkingDay";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { IWorkingDay } from "@/interfaces/dashboard/doctors/workingDays";
import { Clock, Users, Hospital, Calendar, Pen } from "lucide-react";
import convertDay, {
  convertDayFromEnToAr,
} from "@/shared/utils/convertDayLang";
import InfoField from "../../../shared/InfoField";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router";

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
    <Card className="border-muted bg-background dark:bg-dark transition-shadow duration-300 hover:shadow-lg">
      <div>
        <CardHeader className="p-4">
          <CardTitle className="flex flex-row items-center justify-between gap-2 text-lg wrap-break-word break-all text-black dark:text-white">
            <h2 className="flex items-center justify-center gap-2">
              <Calendar className="h-5 w-5" />
              {convertDayFromEnToAr(day)}
            </h2>
            <h3 className="flex items-center justify-center gap-2 font-medium">
              <Hospital className="h-4 w-4" />
              <span>{clinic.name}</span>
            </h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4 pt-0">
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
        </CardContent>
      </div>
      {(canDeleteAction || canUpdateAction) && (
        <div className="mb-3 flex gap-2 px-4">
          {canDeleteAction && (
            <DeleteWorkingDay id={id} name={convertDay(day, "en")} />
          )}
          {canUpdateAction && (
            <Button className="h-auto gap-2 bg-blue-600 px-0 py-0 text-sm text-white hover:bg-blue-700">
              <Link
                to={`/dashboard/doctors/${doctorId}/working-days/${id}/update`}
                className="flex h-9 w-9 items-center justify-center gap-2 px-1 py-1"
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
