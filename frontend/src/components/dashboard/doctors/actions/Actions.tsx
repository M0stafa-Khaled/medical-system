import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActionsList from "./ActionsList";
import AddActionButton from "./AddActionModalButton";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";

const Actions = ({ doctorId }: { doctorId: string }) => {
  const canViewActions = useHasPermission(PERMISSIONS.DOCTOR_ACTIONS);
  const canAddAction = useHasPermission(PERMISSIONS.ADD_ACTION_DOCTOR);

  if (!canViewActions) return null;
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-sm my-2">
        <CardHeader className="pb-2">
          <CardTitle>إجراءات الطبيب:</CardTitle>
        </CardHeader>
        <CardContent className="py-3 px-4">
          {canAddAction && (
            <motion.div variants={itemVariants} custom={"addAction"}>
              <AddActionButton doctorId={doctorId} />
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
