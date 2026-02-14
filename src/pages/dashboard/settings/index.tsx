import { containerVariants } from "@/animations";
import CompanyInfo from "@/components/dashboard/settings/CompanyInfo";
import Subscription from "@/components/dashboard/settings/Subscription";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import NotFound from "@/pages/NotFound";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Settings = () => {
  const canViewCompanyInfo = useHasPermission(PERMISSIONS.COMPANY_INFO);
  const canViewSubscription = useHasPermission(PERMISSIONS.SUBSCRIPTION);
  if (!canViewCompanyInfo && !canViewSubscription) return <NotFound />;
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | الإعدادات</title>
      </Helmet>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {canViewCompanyInfo && <CompanyInfo />}
        {canViewSubscription && <Subscription />}
      </motion.section>
    </>
  );
};

export default Settings;
