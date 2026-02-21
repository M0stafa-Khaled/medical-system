import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { motion } from "framer-motion";
import { itemVariants } from "@/shared/animations";
import { DoctorTransactions } from "./transactions/DoctorTransactions";
import { Actions } from "./actions/Actions";
import { WorkingDays } from "../working-days/components/WorkingDays";

export const DoctorTabs = ({ doctorId }: { doctorId: string }) => {
  const canViewDoctorActions = useHasPermission(PERMISSIONS.DOCTOR_ACTIONS);
  const canViewDoctorWorkingDays = useHasPermission(PERMISSIONS.WORKING_DAYS);
  const canViewDoctorTransactions = useHasPermission(
    PERMISSIONS.DOCTOR_TRANSACTIONS
  );
  return (
    <>
      {(canViewDoctorActions ||
        canViewDoctorWorkingDays ||
        canViewDoctorTransactions) && (
        <motion.div variants={itemVariants}>
          <Tabs
            defaultValue={canViewDoctorActions ? "actions" : "working-days"}
            dir="rtl"
            className="my-2 text-black dark:text-white"
          >
            <TabsList className="h-auto w-full gap-2">
              {canViewDoctorTransactions && (
                <TabsTrigger
                  value="transactions"
                  className="dark:text-muted-foreground w-full py-2.5 text-base font-medium text-slate-700 data-[state=active]:text-black dark:data-[state=active]:text-white"
                >
                  إيرادات الطيبب
                </TabsTrigger>
              )}
              {canViewDoctorActions && (
                <TabsTrigger
                  value="actions"
                  className="dark:text-muted-foreground w-full py-2.5 text-base font-medium text-slate-700 data-[state=active]:text-black dark:data-[state=active]:text-white"
                >
                  الإجراءات
                </TabsTrigger>
              )}
              {canViewDoctorWorkingDays && (
                <TabsTrigger
                  value="working-days"
                  className="dark:text-muted-foreground w-full py-2.5 text-base font-medium text-slate-700 data-[state=active]:text-black dark:data-[state=active]:text-white"
                >
                  ايام العمل
                </TabsTrigger>
              )}
            </TabsList>
            {canViewDoctorTransactions && (
              <TabsContent value="transactions">
                <DoctorTransactions doctorId={doctorId!} />
              </TabsContent>
            )}
            {canViewDoctorActions && (
              <TabsContent value="actions">
                <Actions doctorId={doctorId!} />
              </TabsContent>
            )}
            {canViewDoctorWorkingDays && (
              <TabsContent value="working-days">
                <WorkingDays doctorId={doctorId!} />
              </TabsContent>
            )}
          </Tabs>
        </motion.div>
      )}
    </>
  );
};
