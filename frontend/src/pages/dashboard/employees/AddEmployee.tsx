import EmployeeForm from "@/components/forms/EmployeeForm";
import { Card, CardContent } from "@/components/ui/card";
import addEmployeeSchema from "@/validations/addEmployeeSchema";

const AddEmployee = () => {
  return (
    <Card className="dark:bg-foreground border-gray-300 dark:border-muted shadow-none">
      <div className="flex flex-col space-y-1.5 p-6">
        <h1 className="font-semibold leading-relaxed">إضافة موظف جديد</h1>
      </div>
      <CardContent>
        <EmployeeForm action={"add"} employeeSchema={addEmployeeSchema} />
      </CardContent>
    </Card>
  );
};

export default AddEmployee;
