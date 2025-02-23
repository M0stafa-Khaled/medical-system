import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActionsList from "./ActionsList";
import AddActionModalButton from "./AddActionModalButton";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";

const Actions = ({ doctorId }: { doctorId: string }) => {
  const canViewActions = useHasPermission(PERMISSIONS.DOCTOR_ACTIONS);
  const canAddAction = useHasPermission(PERMISSIONS.ADD_ACTION_DOCTOR);

  if (!canViewActions) return null;
  return (
    <section>
      <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-sm my-2">
        <CardHeader className="pb-2">
          <CardTitle>إجراءات الطبيب:</CardTitle>
        </CardHeader>
        <CardContent className="py-3">
          {canAddAction && <AddActionModalButton doctorId={doctorId} />}
          <ActionsList doctorId={doctorId} />
        </CardContent>
      </Card>
    </section>
  );
};

export default Actions;
