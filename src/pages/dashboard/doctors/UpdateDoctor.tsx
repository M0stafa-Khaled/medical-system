import DoctorForm from "@/components/forms/dashboard/doctors/DoctorForm";
import { Card, CardContent } from "@/components/ui/card";
import cookieServices from "@/utils/cookieServices";
import { updateDoctorSchema } from "@/validations/dashboard/doctorSchema";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useGetDoctorById } from "@/lib/react-query/dashboard/doctors/doctors";
import DataLoader from "@/components/ui/DataLoader";
import { AxiosResErr } from "@/types";
const UpdateDoctor = () => {
  const navigate = useNavigate();
  const token = cookieServices.getToken();

  const { doctorId } = useParams();
  const {
    data: doctor,
    isLoading,
    isError,
    failureReason,
  } = useGetDoctorById({
    id: doctorId!,
    token: token!,
  });

  const doctorFailure = failureReason as AxiosResErr;

  useEffect(() => {
    if (isError || doctorFailure?.response?.data.message) {
      toast.error(
        doctorFailure.response?.data.message || "فشل في تحميل بيانات الطبيب"
      );
      navigate(-1);
      return;
    }
  }, [isError, navigate, doctorFailure]);

  if (isLoading) return <DataLoader />;

  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_WEB_NAME} | د / {doctor?.data.name}
        </title>
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
