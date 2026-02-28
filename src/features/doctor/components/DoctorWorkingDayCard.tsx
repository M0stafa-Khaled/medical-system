import { IWorkingDay } from "@/features/dashboard/doctors/working-days/types";
import { convertDayFromEnToAr } from "@/shared/utils/convertDayLang";
import { Calendar, Clock, Hospital, Timer, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/shared/components/ui/badge";

interface IProps {
  day: IWorkingDay;
}

export const DoctorWorkingDayCard = ({
  day: { day, clinic, start_at, end_at, deuration, max_visitors },
}: IProps) => {
  const isBusy = max_visitors > 30;

  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group cursor-pointer space-y-3"
    >
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-500/20 to-sky-500/20 dark:from-violet-500/30 dark:to-sky-500/30">
            <Calendar className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          </div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            {convertDayFromEnToAr(day)}
          </h2>
        </div>

        <Badge
          variant="secondary"
          className="flex items-center gap-1.5 border-0 bg-linear-to-r from-sky-500/10 to-violet-500/10 px-2.5 py-1 text-xs font-medium text-sky-700 backdrop-blur-sm dark:from-sky-500/20 dark:to-violet-500/20 dark:text-sky-300"
        >
          <Hospital className="h-3 w-3" />
          {clinic.name}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="group/item relative overflow-hidden rounded-lg border border-gray-100 bg-gray-50/50 p-3 transition-all hover:border-violet-200 hover:bg-violet-50/30 dark:border-gray-800 dark:bg-gray-800/30 dark:hover:border-violet-800 dark:hover:bg-violet-900/20">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-100 dark:bg-violet-500/20">
              <Clock className="h-3 w-3 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                وقت العمل
              </p>
              <p className="truncate text-xs font-semibold text-gray-700 dark:text-gray-200">
                {start_at} - {end_at}
              </p>
            </div>
          </div>
        </div>

        <div className="group/item relative overflow-hidden rounded-lg border border-gray-100 bg-gray-50/50 p-3 transition-all hover:border-sky-200 hover:bg-sky-50/30 dark:border-gray-800 dark:bg-gray-800/30 dark:hover:border-sky-800 dark:hover:bg-sky-900/20">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-sky-100 dark:bg-sky-500/20">
              <Timer className="h-3 w-3 text-sky-600 dark:text-sky-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                مدة الكشف
              </p>
              <p className="truncate text-xs font-semibold text-gray-700 dark:text-gray-200">
                {deuration} دقيقة
              </p>
            </div>
          </div>
        </div>

        <div className="group/item relative col-span-2 overflow-hidden rounded-lg border border-gray-100 bg-gray-50/50 p-3 transition-all hover:border-emerald-200 hover:bg-emerald-50/30 dark:border-gray-800 dark:bg-gray-800/30 dark:hover:border-emerald-800 dark:hover:bg-emerald-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-500/20">
                <UserCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                  الحد الأقصى للمرضى
                </p>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                  {max_visitors} أشخاص
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min((max_visitors / 30) * 100, 100)}%`,
                  }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`h-full rounded-full ${
                    isBusy
                      ? "bg-linear-to-r from-orange-400 to-red-500"
                      : "bg-linear-to-r from-emerald-400 to-emerald-500"
                  }`}
                />
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isBusy
                    ? "text-orange-600 dark:text-orange-400"
                    : "text-emerald-600 dark:text-emerald-400"
                }`}
              >
                {isBusy ? "مشغول" : "متاح"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorWorkingDayCard;
