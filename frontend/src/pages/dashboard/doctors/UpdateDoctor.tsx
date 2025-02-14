import DoctorForm from "@/components/forms/DoctorForm";
import { Card, CardContent } from "@/components/ui/card";
import { useGetDoctorById } from "@/lib/react-query/doctors";
import cookieServices from "@/utils/cookieServices";
import updateDoctorSchema from "@/validations/updateDoctorSchema";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateDoctor = () => {
  const navigate = useNavigate();
  const token = cookieServices.getToken();

  const { doctorId } = useParams();
  const {
    data: doctor,
    isLoading,
    isError,
  } = useGetDoctorById({
    id: doctorId as string,
    token: token as string,
  });

  useEffect(() => {
    if (isError) {
      toast.error("فشل في تحميل بيانات الطبيب");
      navigate("/dashboard/doctors");
      return;
    }
    if (!doctor?.status && doctor?.message) {
      toast.error(doctor.message);
      navigate("/dashboard/doctors");
      return;
    }
  }, [isError, navigate, doctorId, doctor]);

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
          تحديث بيانات طبيب
        </h1>
      </div>
      <CardContent>
        <DoctorForm
          action={"update"}
          doctor={doctor?.data}
          doctorSchema={updateDoctorSchema}
        />
      </CardContent>
    </Card>
  );
};

export default UpdateDoctor;
