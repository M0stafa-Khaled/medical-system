import { IDoctorAction } from "@/interfaces/doctors/doctorActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteActionButton from "./DeleteActionModelButton";
import EditActionButton from "./EditActionModalButton";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";

interface IProps {
  action: IDoctorAction;
  doctorId: string;
}
const ActionCard = ({ action, doctorId }: IProps) => {
  const canDeleteAction = useHasPermission(PERMISSIONS.DELETE_ACTION_DOCTOR);
  const canEditAction = useHasPermission(PERMISSIONS.EDIT_ACTION_DOCTOR);

  return (
    <Card className="border-muted bg-background dark:bg-dark flex justify-between items-center">
      <div>
        <CardHeader className="p-4">
          <CardTitle className="text-lg text-black dark:text-white break-words break-all">
            {action.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-black/70 dark:text-white/70">
            السعر:{" "}
            <span className="text-black dark:text-white">{action.price}</span>
          </p>
        </CardContent>
      </div>
      {(canDeleteAction || canEditAction) && (
        <div className="flex flex-col px-4 gap-2">
          {canDeleteAction && (
            <DeleteActionButton id={action.id} name={action.name} />
          )}
          {canEditAction && (
            <EditActionButton doctorId={doctorId} action={action} />
          )}
        </div>
      )}
    </Card>
  );
};

export default ActionCard;
