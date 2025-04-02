import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import cookieServices from "@/utils/cookieServices";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllWorkingDays } from "@/lib/react-query/dashboard/doctors/workingDays";
import WorkingDayCard from "./WorkingDayCard";
import SearchInput from "../../SearchInput";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";
import CardSkeleton from "@/components/ui/CardSkeleton";

interface IProps {
  doctorId: string;
}

const WorkingDays = ({ doctorId }: IProps) => {
  const canViewWorkingDays = useHasPermission(PERMISSIONS.WORKING_DAYS);
  const canCreateWorkingDay = useHasPermission(PERMISSIONS.ADD_WORKING_DAY);
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const search = useDebounce(searchParams.get("q"), 500)!;
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
          {canCreateWorkingDay && (
            <div className="mb-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
              <Button
                size={"sm"}
                variant={"outline"}
                className=" h-auto py-0 px-0 bg-primary md:bg-transparent md:text-primary text-primary-foreground hover:!bg-primary hover:!text-white !border-primary dark:hover:!text-black !rounded-lg font-semibold"
              >
                <Link
                  to={`/dashboard/doctors/${doctorId}/working-days/create`}
                  className="flex justify-center items-center gap-2 w-full h-full py-4 px-4"
                >
                  إضافة يوم عمل
                  <FiPlus size={20} />
                </Link>
              </Button>
              <SearchInput placeholder="ابحث باسم العيادة" />
            </div>
          )}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoading ? (
              <CardSkeleton mdLength={1} lgLength={2} count={3} />
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
                    <WorkingDayCard day={day} doctorId={doctorId} />
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
