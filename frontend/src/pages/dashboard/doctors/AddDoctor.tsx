import DoctorForm from "@/components/forms/DoctorForm";
import { Card, CardContent } from "@/components/ui/card";

const AddDoctor = () => {
  return (
    <Card className="dark:bg-foreground border-muted">
      <div className="flex flex-col space-y-1.5 p-6">
        <h1 className="font-semibold leading-none tracking-tight">
          إضافة طبيب جديد
        </h1>
      </div>
      <CardContent>
        <DoctorForm action={"add"} />
      </CardContent>
    </Card>
  );
};

export default AddDoctor;
