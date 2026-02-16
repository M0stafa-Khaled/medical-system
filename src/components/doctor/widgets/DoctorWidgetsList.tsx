import { Skeleton } from "@/shared/components/ui/skeleton";
import cookieServices from "@/shared/utils/cookieServices";
import { motion } from "framer-motion";
import WidgetCard from "../../shared/widgets/WidgetCard";
import {
  BadgeDollarSign,
  Bookmark,
  Building2,
  Calendar,
  Users,
} from "lucide-react";
import { containerVariants, itemVariants } from "@/animations";
import { Fragment } from "react/jsx-runtime";
import { Separator } from "@/shared/components/ui/separator";
import { DoctorWorkingDayCard } from "./DoctorWorkingDayCard";
import { useGetDoctorWidgets } from "@/shared/lib/react-query/doctor/doctorWidgets";

const DoctorWidgetsList = () => {
  const token = cookieServices.getToken()!;
  const { data: widgets, isLoading } = useGetDoctorWidgets(token);

  const widgetsArabic = {
    transactions_total: {
      title: "اجمالي الإيرادات",
      path: "#",
      icon: <BadgeDollarSign size={18} />,
    },
    bookings_count: {
      title: "الحجوزات",
      path: "/doctor/bookings",
      icon: <Bookmark size={18} />,
    },
    patients_count: {
      title: "المرضى",
      path: "#",
      icon: <Users size={18} />,
    },
    clinics_count: {
      title: "العيادات",
      path: "/doctor/bookings",
      icon: <Building2 size={18} />,
    },
    prescriptions_count: {
      title: "الروشتات",
      path: "/dashboard/clinics",
      icon: <Building2 size={18} />,
    },
  };

  return (
    <div className="flex flex-col gap-4 xl:flex-row">
      {isLoading ? (
        <Skeleton className="h-60 w-full xl:w-[50%] 2xl:w-[40%]" />
      ) : (
        <div className="w-full xl:w-[50%] 2xl:w-[40%]">
          <motion.div
            variants={itemVariants}
            key="working_days"
            custom={0}
            className="bg-card text-card-foreground dark:border-primary/20 cursor-pointer space-y-2 rounded-xl border shadow-sm dark:bg-black"
          >
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <div className="text-lg font-medium tracking-tight">
                ايام العمل
              </div>
              <Calendar className="h-5 w-5" />
            </div>
            <div className="p-6 pt-0">
              {widgets &&
                "working_days" in widgets.data &&
                widgets.data.working_days.map((day) => (
                  <Fragment key={day.id}>
                    <DoctorWorkingDayCard day={day} />
                    {widgets.data.working_days.length - 1 === day.id && (
                      <Separator className="bg-primary/20 my-2" />
                    )}
                  </Fragment>
                ))}
            </div>
          </motion.div>
        </div>
      )}
      <motion.div
        className="grid content-start gap-4 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileInView="visible"
      >
        {isLoading
          ? Array.from({ length: 10 }, (_, idx) => (
              <Skeleton key={idx} className="h-28 w-full" />
            ))
          : widgets?.data &&
            Object.entries(widgets.data).map(([key, value], idx) =>
              key === "working_days" ? null : (
                <motion.div
                  variants={itemVariants}
                  key={key}
                  custom={idx}
                  className="h-fit"
                >
                  <WidgetCard
                    title={
                      widgetsArabic[key as keyof typeof widgetsArabic].title
                    }
                    icon={widgetsArabic[key as keyof typeof widgetsArabic].icon}
                    path={widgetsArabic[key as keyof typeof widgetsArabic].path}
                    value={value}
                  />
                </motion.div>
              )
            )}
      </motion.div>
    </div>
  );
};

export default DoctorWidgetsList;
