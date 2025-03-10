import useDebounce from "@/hooks/useDebounce";
import cookieServices from "@/utils/cookieServices";
import { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import TreasuriesActions from "./TreasuriesActions";
import TreasuryCard from "./TreasuryCard";
import CardSkeleton from "@/components/ui/CardSkeleton";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import { useGetAllTreasuries } from "@/lib/react-query/dashboard/treasuries";

const TreasuriesList = () => {
  const token = cookieServices.getToken()!;
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);
  const {
    data: treasuries,
    isLoading,
    isError,
  } = useGetAllTreasuries({
    token,
    search,
  });

  useEffect(() => {
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [isError]);

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <TreasuriesActions
        searchKeyword={searchTerm}
        setSearchKeyword={setSearchTerm}
      />

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
