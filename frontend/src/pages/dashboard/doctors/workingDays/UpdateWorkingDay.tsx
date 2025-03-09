import WorkingDayForm from "@/components/forms/doctors/WorkingDayForm";
import { Card, CardContent } from "@/components/ui/card";
import DataLoader from "@/components/ui/DataLoader";
import { useGetWorkingDayById } from "@/lib/react-query/doctors/workingDays";
import cookieServices from "@/utils/cookieServices";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const UpdateWorkingDay = () => {
  const { id } = useParams();
  const token = cookieServices.getToken()!;
  const { data: day, isLoading } = useGetWorkingDayById({ token, id: id! });

  if (isLoading) return <DataLoader />;
  return (
    <>
      <Helmet>
        <title>EgProg | تحديث يوم عمل</title>
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
            <WorkingDayForm action={"update"} doctorId={id!} day={day?.data} />
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default UpdateWorkingDay;
