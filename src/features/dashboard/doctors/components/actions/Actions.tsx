import { ActionsList } from "./ActionsList";
import { CreateAction } from "./CreateAction";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/shared/animations";

export const Actions = ({ doctorId }: { doctorId: string }) => {
  const canViewActions = useHasPermission(PERMISSIONS.DOCTOR_ACTIONS);
  const canCreateAction = useHasPermission(PERMISSIONS.ADD_ACTION_DOCTOR);

  if (!canViewActions) return null;
  return (
    <>
      {canCreateAction && (
        <motion.div variants={itemVariants} custom={"createAction"}>
          <CreateAction doctorId={doctorId} />
        </motion.div>
      )}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ActionsList doctorId={doctorId} />
      </motion.div>
    </>
  );
};
