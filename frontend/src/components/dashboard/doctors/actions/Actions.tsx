import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActionsList from "./ActionsList";
import AddActionModalButton from "./AddActionModalButton";

const Actions = ({ doctorId }: { doctorId: string }) => {
  return (
    <section>
      <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-sm my-2">
        <CardHeader className="pb-2">
          <CardTitle>إجراءات الطبيب:</CardTitle>
        </CardHeader>
        <CardContent className="py-3">
          <AddActionModalButton doctorId={doctorId} />
          <ActionsList doctorId={doctorId} />
        </CardContent>
      </Card>
    </section>
  );
};

export default Actions;
