import { WorkingDayForm } from "@/features/dashboard/doctors/working-days/components/WorkingDayForm";
import { Card, CardContent } from "@/shared/components/ui/card";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const CreateWorkingDay = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | إضافة يوم عمل</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="dark:bg-foreground dark:border-muted border-gray-300 shadow-none">
          <div className="flex flex-col space-y-1.5 p-6">
            <h1 className="leading-relaxed font-semibold">
              إضافة يوم عمل جديد
            </h1>
          </div>
          <CardContent>
            <WorkingDayForm action={"create"} />
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default CreateWorkingDay;
