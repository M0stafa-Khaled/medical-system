import useDebounce from "@/hooks/useDebounce";
import cookieServices from "@/utils/cookieServices";
import { memo, useEffect } from "react";
import { toast } from "react-toastify";
import TreasuriesHeader from "./TreasuriesHeader";
import TreasuryCard from "./TreasuryCard";
import CardSkeleton from "@/components/ui/CardSkeleton";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import { useGetAllTreasuries } from "@/lib/react-query/dashboard/treasuries";
import { useSearchParams } from "react-router-dom";

const TreasuriesList = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const search = useDebounce(searchParams.get("q"), 500)!;
  const {
    data: treasuries,
    isLoading,
    isError,
  } = useGetAllTreasuries({
    token,
    search,
  });

  useEffect(() => {
    if (treasuries?.message) toast.error(treasuries.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [treasuries?.message, isError]);

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <TreasuriesHeader />

      {isLoading ? (
        <CardSkeleton />
      ) : !treasuries?.data?.length ? (
        <p className="text-center text-muted-foreground py-3">لا يوجد خزائن</p>
      ) : (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-4"
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

export default memo(TreasuriesList);
