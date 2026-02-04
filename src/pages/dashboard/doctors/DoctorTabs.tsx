import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkingDays from "@/components/dashboard/doctors/workingDays/WorkingDays";
import Actions from "@/components/dashboard/doctors/actions/Actions";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { motion } from "framer-motion";
import { itemVariants } from "@/animations";
import DoctorTransactions from "@/components/dashboard/doctors/transactions/DoctorTransactions";

const DoctorTabs = ({ doctorId }: { doctorId: string }) => {
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
            className="text-black dark:text-white my-2"
          >
            <TabsList className="h-auto w-full gap-2">
              {canViewDoctorTransactions && (
                <TabsTrigger
                  value="transactions"
                  className="w-full py-2.5 font-medium text-base text-slate-700 dark:text-muted-foreground data-[state=active]:text-black dark:data-[state=active]:text-white"
                >
                  إيرادات الطيبب
                </TabsTrigger>
              )}
              {canViewDoctorActions && (
                <TabsTrigger
                  value="actions"
                  className="w-full py-2.5 font-medium text-base text-slate-700 dark:text-muted-foreground data-[state=active]:text-black dark:data-[state=active]:text-white"
                >
                  الإجراءات
                </TabsTrigger>
              )}
              {canViewDoctorWorkingDays && (
                <TabsTrigger
                  value="working-days"
                  className="w-full py-2.5 font-medium text-base text-slate-700 dark:text-muted-foreground data-[state=active]:text-black dark:data-[state=active]:text-white"
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

export default DoctorTabs;
