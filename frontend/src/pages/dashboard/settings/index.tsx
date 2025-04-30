import { containerVariants } from "@/animations";
import CompanyInfo from "@/components/dashboard/company/CompanyInfo";
import Subscription from "@/components/dashboard/company/Subscription";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import NotFound from "@/pages/NotFound";
import { motion } from "framer-motion";

const Settings = () => {
  const canViewCompanyInfo = useHasPermission(PERMISSIONS.COMPANY_INFO);
  const canViewSubscription = useHasPermission(PERMISSIONS.SUBSCRIPTION);
  if (!canViewCompanyInfo && !canViewSubscription) return <NotFound />;
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {canViewCompanyInfo && <CompanyInfo />}
      {canViewSubscription && <Subscription />}
    </motion.section>
  );
};

export default Settings;
