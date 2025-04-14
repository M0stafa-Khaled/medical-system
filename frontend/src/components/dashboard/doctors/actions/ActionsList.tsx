import { useGetDoctorActions } from "@/lib/react-query/dashboard/doctors/doctorActions";
import cookieServices from "@/utils/cookieServices";
import ActionCard from "./ActionCard";
import ActionSkeleton from "@/components/ui/ActionSkeleton";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { toast } from "react-toastify";
interface IProps {
  doctorId: string;
}

const ActionsList = ({ doctorId }: IProps) => {
  const token = cookieServices.getToken()!;
  const {
    data: actions,
    isLoading,
    isError,
  } = useGetDoctorActions({ token, doctorId });

  useEffect(() => {
    if (actions?.message && !actions.status) toast.error(actions.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [actions?.message, isError, actions?.status]);

  if (isLoading) return <ActionSkeleton />;
  return (
    <>
      {!actions?.data?.length ? (
        <p className="text-center text-muted-foreground py-3">
          لا يوجد إجراءات
        </p>
      ) : (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4"
        >
          {actions?.data?.map((action, idx) => (
            <motion.div variants={itemVariants} custom={idx} key={action.id}>
              <ActionCard action={action} doctorId={doctorId} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default ActionsList;
