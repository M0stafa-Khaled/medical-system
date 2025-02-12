import DoctorForm from "@/components/forms/DoctorForm";
import { Card, CardContent } from "@/components/ui/card";
import AddDoctorSchema from "@/validations/AddDoctorSchema";

const AddDoctor = () => {
  return (
    <Card className="dark:bg-foreground border-gray-300 dark:border-muted shadow-none">
      <div className="flex flex-col space-y-1.5 p-6">
        <h1 className="font-semibold leading-relaxed">إضافة طبيب جديد</h1>
      </div>
      <CardContent>
        <DoctorForm action={"add"} doctorSchema={AddDoctorSchema} />
      </CardContent>
    </Card>
  );
};

export default AddDoctor;
