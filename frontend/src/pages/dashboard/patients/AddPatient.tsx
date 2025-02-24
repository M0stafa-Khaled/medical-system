import PatientForm from "@/components/forms/patients/PatientForm";
import { Card, CardContent } from "@/components/ui/card";
import addPatientSchema from "@/validations/addPatientSchema";

const AddPatient = () => {
  return (
    <Card className="dark:bg-foreground border-gray-300 dark:border-muted shadow-none">
      <div className="flex flex-col space-y-1.5 p-6">
        <h1 className="font-semibold leading-relaxed">إضافة مريض جديد</h1>
      </div>
      <CardContent>
        <PatientForm action={"add"} patientSchema={addPatientSchema} />
      </CardContent>
    </Card>
  );
};

export default AddPatient;
