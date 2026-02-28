import { type IClinic } from "@/features/dashboard/clinics/types";
import { Badge } from "@/shared/components/ui/badge";
import { motion } from "framer-motion";
import { Building2, ArrowUpLeft, Activity } from "lucide-react";
import { useNavigate } from "react-router";

interface IProps {
  clinic: IClinic;
}

const ClinicCard = ({ clinic: { id, name, status } }: IProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative cursor-pointer"
      onClick={() => navigate(`/doctor/clinics/bookings/${id}`)}
    >
      <div className="border-muted relative overflow-hidden rounded-2xl border bg-white/80 p-6 shadow-lg transition-all duration-500 dark:bg-gray-900/80 dark:shadow-gray-900/50">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <motion.div
            animate={
              status
                ? {
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`h-2.5 w-2.5 rounded-full ${
              status
                ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                : "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
            }`}
          />
        </div>

        <div className="group relative z-10 flex flex-col items-center gap-5 py-2">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="bg-primary flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-lg"
          >
            <Building2 className="h-8 w-8 text-white" />
          </motion.div>

          <div className="text-center">
            <h3 className="group-hover:text-primary text-xl font-bold transition-colors">
              {name}
            </h3>
            <div className="mt-1 flex items-center justify-center gap-1.5">
              <Activity className="text-primary h-3 w-3" />
              <span className="text-muted-foreground text-xs font-medium">
                معرف العيادة: #{id}
              </span>
            </div>
          </div>

          <Badge
            className={`rounded-full border-0 px-4 py-1.5 text-sm font-medium ${
              status
                ? "bg-emerald-500/15 text-emerald-700 backdrop-blur-sm dark:bg-emerald-500/20 dark:text-emerald-300"
                : "bg-red-500/15 text-red-700 backdrop-blur-sm dark:bg-red-500/20 dark:text-red-300"
            }`}
          >
            <span className="relative ml-1.5 flex h-1.5 w-1.5">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                  status ? "bg-emerald-500" : "bg-red-500"
                }`}
              />
              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                  status ? "bg-emerald-600" : "bg-red-600"
                }`}
              />
            </span>
            {status ? "نشطة" : "غير نشطة"}
          </Badge>

          <motion.div
            initial={{ opacity: 0, y: 5 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1 text-xs font-medium text-sky-600 opacity-0 transition-all group-hover:opacity-100 dark:text-sky-400"
          >
            <span>عرض التفاصيل</span>
            <ArrowUpLeft className="h-3.5 w-3.5" />
          </motion.div>
        </div>
        <div className="bg-primary/80 absolute inset-x-0 bottom-0 h-1" />
      </div>
    </motion.div>
  );
};

export default ClinicCard;
