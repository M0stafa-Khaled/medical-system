import PatientForm from "@/components/forms/patients/PatientForm";
import { Card, CardContent } from "@/components/ui/card";
import { useGetPatientById } from "@/lib/react-query/patients";
import cookieServices from "@/utils/cookieServices";
import updatePatientSchema from "@/validations/updatePatientSchema";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdatePatient = () => {
  const navigate = useNavigate();
  const token = cookieServices.getToken();

  const { patientId } = useParams();
  const {
    data: patient,
    isLoading,
    isError,
  } = useGetPatientById({
    id: patientId as string,
    token: token as string,
  });

  useEffect(() => {
    if (isError) {
      toast.error("فشل في تحميل بيانات المريض");
      navigate("/dashboard/patients");
      return;
    }

    if (!patient?.status && patient?.message) {
      toast.error(patient.message);
      navigate("/dashboard/patients");
      return;
    }
  }, [isError, navigate, patientId, patient]);

  if (isLoading)
    return (
      <div className="mt-20 text-black dark:text-white flex justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );

  return (
    <Card className="mt-10 dark:bg-foreground border-muted">
      <div className="flex flex-col space-y-1.5 p-6">
        <h1 className="font-semibold leading-none tracking-tight">
          تحديث بيانات المريض
        </h1>
      </div>
      <CardContent>
        <PatientForm
          action={"update"}
          patient={patient?.data}
          patientSchema={updatePatientSchema}
        />
      </CardContent>
    </Card>
  );
};

export default UpdatePatient;
