import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import cookieServices from "@/shared/utils/cookieServices";
import useDebounce from "@/shared/hooks/useDebounce";
import { useGetAllWorkingDays } from "@/shared/lib/react-query/dashboard/doctors/workingDays";
import WorkingDayCard from "./WorkingDayCard";
import SearchInput from "../../../../shared/components/ui/SearchInput";
import { Button } from "@/shared/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { Link, useSearchParams } from "react-router";
import CardSkeleton from "@/shared/components/ui/CardSkeleton";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface IProps {
  doctorId: string;
}

const WorkingDays = ({ doctorId }: IProps) => {
  const canViewWorkingDays = useHasPermission(PERMISSIONS.WORKING_DAYS);
  const canCreateWorkingDay = useHasPermission(PERMISSIONS.ADD_WORKING_DAY);
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const search = useDebounce(searchParams.get("q"), 500)!;
  const {
    data: days,
    isLoading,
    isError,
  } = useGetAllWorkingDays({
    token,
    doctorId,
    search,
  });

  useEffect(() => {
    if (days?.message && !days.status) toast.error(days.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [days?.message, isError, days?.status]);

  if (!canViewWorkingDays) return null;

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted my-2 shadow-xs">
        <CardHeader className="pb-2">
          <CardTitle>ايام العمل:</CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-3">
          {canCreateWorkingDay && (
            <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <Button className="flex h-auto items-center gap-2 px-0 py-0">
                <Link
                  to={`/dashboard/doctors/${doctorId}/working-days/create`}
                  className="flex h-full w-full items-center justify-center gap-2 px-4 py-3"
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
              <p className="text-muted-foreground py-3 text-center">
                لا يوجد ايأم عمل
              </p>
            ) : (
              <motion.div
                variants={containerVariants}
                className="my-4 grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-2"
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
