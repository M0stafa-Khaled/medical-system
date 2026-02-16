import { Card, CardContent } from "@/shared/components/ui/card";
import DataLoader from "@/shared/components/ui/DataLoader";
import { AxiosResErr } from "@/shared/types";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { useGetWorkingDayById } from "../queriesAndMutations";
import { WorkingDayForm } from "../components/WorkingDayForm";

const UpdateWorkingDay = () => {
  const navigate = useNavigate();
  const { workingDayId } = useParams();
  const {
    data: day,
    isLoading,
    isError,
    failureReason,
  } = useGetWorkingDayById({
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
        <Card className="dark:bg-foreground dark:border-muted border-gray-300 shadow-none">
          <div className="flex flex-col space-y-1.5 p-6">
            <h1 className="leading-relaxed font-semibold">
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
