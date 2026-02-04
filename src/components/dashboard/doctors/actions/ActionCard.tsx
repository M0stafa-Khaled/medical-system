import { IDoctorAction } from "@/interfaces/dashboard/doctors/doctorActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteAction from "./DeleteAction";
import UpdateAction from "./UpdateAction";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { numberToPrice } from "@/utils/numberToPrice";

interface IProps {
  action: IDoctorAction;
  doctorId: string;
}
const ActionCard = ({ action, doctorId }: IProps) => {
  const canDeleteAction = useHasPermission(PERMISSIONS.DELETE_ACTION_DOCTOR);
  const canUpdateAction = useHasPermission(PERMISSIONS.UPDATE_ACTION_DOCTOR);

  return (
    <Card className="border-muted bg-background dark:bg-dark flex justify-between items-center">
      <div>
        <CardHeader className="p-4">
          <CardTitle className="text-lg text-black dark:text-white wrap-break-word break-all">
            {action.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-black/70 dark:text-white/70">
            السعر:{" "}
            <span className="text-black dark:text-white">{numberToPrice(action.price)}</span>
          </p>
        </CardContent>
      </div>
      {(canDeleteAction || canUpdateAction) && (
        <div className="flex flex-col px-4 gap-2">
          {canDeleteAction && (
            <DeleteAction id={action.id} name={action.name} />
          )}
          {canUpdateAction && (
            <UpdateAction doctorId={doctorId} action={action} />
          )}
        </div>
      )}
    </Card>
  );
};

export default ActionCard;
