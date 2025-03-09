import DoctorForm from "@/components/forms/doctors/DoctorForm";
import { Card, CardContent } from "@/components/ui/card";
import cookieServices from "@/utils/cookieServices";
import updateDoctorSchema from "@/validations/updateDoctorSchema";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useGetDoctorById } from "@/lib/react-query/doctors/doctors";
const UpdateDoctor = () => {
  const navigate = useNavigate();
  const token = cookieServices.getToken();

  const { doctorId } = useParams();
  const {
    data: doctor,
    isLoading,
    isError,
  } = useGetDoctorById({
    id: doctorId!,
    token: token!,
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
    <>
      <Helmet>
        <title>EgProg | د / {doctor?.data.name}</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-6"
      >
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
      </motion.section>
    </>
  );
};

export default UpdateDoctor;
