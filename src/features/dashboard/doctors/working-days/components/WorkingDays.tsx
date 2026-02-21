import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/shared/animations";
import useDebounce from "@/shared/hooks/useDebounce";
import { WorkingDayCard } from "./WorkingDayCard";
import { Button } from "@/shared/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { Link, useSearchParams } from "react-router";
import { CardSkeleton } from "@/shared/components/ui/CardSkeleton";
import { useEffect } from "react";
import { toast } from "react-toastify";
import SearchInput from "@/shared/components/ui/SearchInput";
import { useGetAllWorkingDays } from "../queriesAndMutations";

interface IProps {
  doctorId: string;
}

export const WorkingDays = ({ doctorId }: IProps) => {
  const canViewWorkingDays = useHasPermission(PERMISSIONS.WORKING_DAYS);
  const canCreateWorkingDay = useHasPermission(PERMISSIONS.ADD_WORKING_DAY);
  const [searchParams] = useSearchParams();
  const search = useDebounce(searchParams.get("q"), 500)!;
  const {
    data: days,
    isLoading,
    isError,
  } = useGetAllWorkingDays({
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
      <Card className="border-muted mt-5">
        <CardHeader className="pb-2">
          <CardTitle>ايام العمل:</CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-3">
          {canCreateWorkingDay && (
            <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <Button className="dark:btn-primary" asChild size={"lg"}>
                <Link to={`/dashboard/doctors/${doctorId}/working-days/create`}>
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
