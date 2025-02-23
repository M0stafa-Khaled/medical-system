import { IDoctorAction } from "@/interfaces/doctorActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteActionModalButton from "./DeleteActionModelButton";
import EditActionModalButton from "./EditActionModalButton";

interface IProps {
  action: IDoctorAction;
  doctorId: string;
}
const ActionCard = ({ action, doctorId }: IProps) => {
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
      <div className="flex flex-col px-4 gap-2">
        <DeleteActionModalButton id={action.id} name={action.name} />
        <EditActionModalButton doctorId={doctorId} action={action} />
      </div>
    </Card>
  );
};

export default ActionCard;
