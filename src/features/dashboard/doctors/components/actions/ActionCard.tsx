import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { UpdateAction } from "./UpdateAction";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { DeleteAlert } from "@/shared/components/delete-alert";
import { IDoctorAction } from "../../types";
import { useDeleteDoctorAction } from "../../queriesAndMutations";

interface IProps {
  action: IDoctorAction;
  doctorId: string;
}
export const ActionCard = ({ action, doctorId }: IProps) => {
  const canDeleteAction = useHasPermission(PERMISSIONS.DELETE_ACTION_DOCTOR);
  const canUpdateAction = useHasPermission(PERMISSIONS.UPDATE_ACTION_DOCTOR);

  const { mutateAsync: deleteAction } = useDeleteDoctorAction();
  return (
    <Card className="border-muted flex items-center justify-between">
      <div>
        <CardHeader className="p-4">
          <CardTitle className="text-lg wrap-break-word break-all">
            {action.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-black/70 dark:text-white/70">
            السعر:{" "}
            <span className="text-black dark:text-white">
              {numberToPrice(action.price)}
            </span>
          </p>
        </CardContent>
      </div>
      {(canDeleteAction || canUpdateAction) && (
        <div className="flex flex-col gap-2 px-4">
          {canDeleteAction && (
            <DeleteAlert
              name={action.name}
              deleteAction={() => deleteAction({ id: action.id.toString() })}
            />
          )}
          {canUpdateAction && (
            <UpdateAction doctorId={doctorId} action={action} />
          )}
        </div>
      )}
    </Card>
  );
};
