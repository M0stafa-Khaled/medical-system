import { DoctorForm } from "@/features/dashboard/doctors/components/DoctorForm";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import DataLoader from "@/shared/components/ui/DataLoader";
import { AxiosResErr } from "@/shared/types";
import { useGetDoctorById } from "../queriesAndMutations";
import { updateDoctorSchema } from "../schema";

const UpdateDoctor = () => {
  const navigate = useNavigate();

  const { doctorId } = useParams();
  const {
    data: doctor,
    isLoading,
    isError,
    failureReason,
  } = useGetDoctorById({
    id: doctorId!,
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
        <Card className="border-muted mt-5">
          <div className="flex flex-col space-y-1.5 p-6">
            <h1 className="leading-none font-semibold tracking-tight">
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
