import { containerVariants, itemVariants } from "@/shared/animations";
import { motion } from "framer-motion";
import ClinicCard from "./ClinicCard";
import { Building2 } from "lucide-react";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useGetDoctorClinics } from "../../../queriesAndMutations";

const ClinicSkeletonCard = ({ index }: { index: number }) => (
  <motion.div
    variants={itemVariants}
    initial="hidden"
    animate="visible"
    custom={index}
    className="bg-card border-muted relative overflow-hidden rounded-2xl border p-6 shadow-lg"
  >
    <div className="flex flex-col items-center gap-5 py-2">
      <Skeleton className="h-16 w-16 shrink-0 rounded-2xl" />
      <div className="space-y-2 text-center">
        <Skeleton className="mx-auto h-6 w-32 rounded-md" />
        <Skeleton className="mx-auto h-3 w-20 rounded-md" />
      </div>
      <Skeleton className="h-8 w-24 rounded-full" />
      <Skeleton className="h-3 w-20 rounded-md" />
    </div>
    <div className="absolute inset-x-0 bottom-0 h-1 w-full">
      <Skeleton className="bg-primary/20 h-full" />
    </div>
  </motion.div>
);

const EmptyClinicsState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="col-span-full"
  >
    <div className="border-muted relative overflow-hidden rounded-2xl border border-dashed p-12 text-center">
      <div>
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gray-100 dark:bg-slate-800/20">
          <Building2 className="text-primary h-12 w-12" />
        </div>

        <h3 className="text-xl font-semibold">لا يوجد لديك عيادات</h3>
      </div>
    </div>
  </motion.div>
);

const DoctorClinicsList = () => {
  const { data: clinics, isLoading } = useGetDoctorClinics();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    >
      {isLoading ? (
        <>
          {Array.from({ length: 4 }, (_, idx) => (
            <ClinicSkeletonCard key={idx} index={idx} />
          ))}
        </>
      ) : !clinics?.data.length ? (
        // Empty State
        <EmptyClinicsState />
      ) : (
        // Clinic Cards
        clinics.data.map((clinic, index) => (
          <motion.div
            key={clinic.id}
            variants={itemVariants}
            custom={index}
            initial="hidden"
            animate="visible"
          >
            <ClinicCard clinic={clinic} />
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default DoctorClinicsList;
