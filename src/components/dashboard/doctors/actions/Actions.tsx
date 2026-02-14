import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import ActionsList from "./ActionsList";
import CreateAction from "./CreateAction";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";

const Actions = ({ doctorId }: { doctorId: string }) => {
  const canViewActions = useHasPermission(PERMISSIONS.DOCTOR_ACTIONS);
  const canCreateAction = useHasPermission(PERMISSIONS.ADD_ACTION_DOCTOR);

  if (!canViewActions) return null;
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted my-2 shadow-xs">
        <CardHeader className="pb-2">
          <CardTitle>إجراءات الطبيب:</CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-3">
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
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default Actions;
