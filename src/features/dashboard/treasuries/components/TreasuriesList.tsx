import useDebounce from "@/shared/hooks/useDebounce";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { TreasuryCard } from "./TreasuryCard";
import { CardSkeleton } from "@/shared/components/ui/CardSkeleton";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/shared/animations";
import { useGetAllTreasuries } from "@/features/dashboard/treasuries/queriesAndMutations";
import { useSearchParams } from "react-router";

export const TreasuriesList = () => {
  const [searchParams] = useSearchParams();
  const search = useDebounce(searchParams.get("q"), 500)!;
  const {
    data: treasuries,
    isLoading,
    isError,
  } = useGetAllTreasuries({
    search,
  });

  useEffect(() => {
    if (treasuries?.message && !treasuries.status)
      toast.error(treasuries.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [treasuries?.message, isError, treasuries?.status]);

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      {isLoading ? (
        <CardSkeleton />
      ) : !treasuries?.data?.length ? (
        <p className="text-muted-foreground py-3 text-center">لا يوجد خزائن</p>
      ) : (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {treasuries?.data?.map((treasury, idx) => (
            <motion.div key={treasury.id} variants={itemVariants} custom={idx}>
              <TreasuryCard treasury={treasury} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
