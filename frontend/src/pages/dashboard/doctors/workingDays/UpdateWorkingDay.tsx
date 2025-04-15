import WorkingDayForm from "@/components/forms/dashboard/doctors/WorkingDayForm";
import { Card, CardContent } from "@/components/ui/card";
import DataLoader from "@/components/ui/DataLoader";
import { useGetWorkingDayById } from "@/lib/react-query/dashboard/doctors/workingDays";
import { AxiosResErr } from "@/types";
import cookieServices from "@/utils/cookieServices";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateWorkingDay = () => {
  const navigate = useNavigate();
  const { workingDayId } = useParams();
  const token = cookieServices.getToken()!;
  const {
    data: day,
    isLoading,
    isError,
    failureReason,
  } = useGetWorkingDayById({
    token,
    id: workingDayId!,
  });

  const workingDayFailure = failureReason as AxiosResErr;

  useEffect(() => {
    if (isError || workingDayFailure?.response?.data.message) {
      toast.error(
        workingDayFailure.response?.data.message ||
          "فشل في تحميل بيانات يوم العمل"
      );
      navigate(-1);
      return;
    }
  }, [isError, navigate, workingDayFailure]);

  if (isLoading) return <DataLoader />;
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تحديث يوم عمل</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="dark:bg-foreground border-gray-300 dark:border-muted shadow-none">
          <div className="flex flex-col space-y-1.5 p-6">
            <h1 className="font-semibold leading-relaxed">
              تحديث بيانات يوم عمل
            </h1>
          </div>
          <CardContent>
            <WorkingDayForm action={"update"} day={day?.data} />
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default UpdateWorkingDay;
