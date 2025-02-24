import DoctorForm from "@/components/forms/doctors/DoctorForm";
import { Card, CardContent } from "@/components/ui/card";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import AddDoctorSchema from "@/validations/addDoctorSchema";

const AddDoctor = () => {
  const canEditDoctor = useHasPermission(PERMISSIONS.EDIT_DOCTOR);

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
