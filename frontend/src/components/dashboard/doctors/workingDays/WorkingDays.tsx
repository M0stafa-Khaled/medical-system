import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import cookieServices from "@/utils/cookieServices";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllWorkingDays } from "@/lib/react-query/doctors/workingDays";
import WorkingDayCard from "./WorkingDayCard";
import ActionSkeleton from "@/components/ui/ActionSkeleton";
import SearchInput from "../../SearchInput";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";

interface IProps {
  doctorId: string;
  navigateWorkingDay: (mode?: "create" | "update") => void;
}

const WorkingDays = ({ doctorId, navigateWorkingDay }: IProps) => {
  const canViewWorkingDays = useHasPermission(PERMISSIONS.DOCTOR_ACTIONS);
  const canAddWorkingDay = useHasPermission(PERMISSIONS.ADD_ACTION_DOCTOR);
  const token = cookieServices.getToken()!;
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);
  const { data: days, isLoading } = useGetAllWorkingDays({
    token,
    doctorId,
    search,
  });

  if (!canViewWorkingDays) return null;

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-sm my-2">
        <CardHeader className="pb-2">
          <CardTitle>ايام العمل:</CardTitle>
        </CardHeader>
        <CardContent className="py-3 px-4">
          {canAddWorkingDay && (
            <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
              <Button
                onClick={() => navigateWorkingDay("create")}
                variant={"outline"}
                className="w-full md:w-fit bg-primary md:bg-transparent md:text-primary text-primary-foreground gap-2 hover:!bg-primary hover:!text-white !border-primary dark:hover:!text-black h-auto py-3 !rounded-lg font-semibold"
              >
                إضافة يوم عمل
                <FiPlus size={20} />
              </Button>
              <SearchInput
                searchKeyword={searchTerm}
                setSearchKeyword={setSearchTerm}
                placeholder="ابحث باسم العيادة"
              />
            </div>
          )}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoading ? (
              <ActionSkeleton />
            ) : !days?.data?.length ? (
              <p className="text-center text-muted-foreground py-3">
                لا يوجد ايأم عمل
              </p>
            ) : (
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-4 my-4"
              >
                {days?.data?.map((day, idx) => (
                  <motion.div variants={itemVariants} custom={idx} key={day.id}>
                    <WorkingDayCard
                      day={day}
                      doctorId={doctorId}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default WorkingDays;
