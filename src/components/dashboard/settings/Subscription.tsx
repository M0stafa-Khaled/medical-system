import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useGetSubscription } from "@/shared/lib/react-query/dashboard/company";
import cookieServices from "@/shared/utils/cookieServices";
import formatDateTime from "@/shared/utils/formatDate";
import FeaturesUsage from "./FeaturesUsage";
import DataLoader from "@/shared/components/ui/DataLoader";
import { containerVariants } from "@/animations";
import { motion } from "framer-motion";

const Subscription = () => {
  const token = cookieServices.getToken()!;
  const { data: subscription, isLoading } = useGetSubscription(token);

  if (isLoading)
    return (
      <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted my-2 shadow-xs">
        <CardHeader>
          <CardTitle>تفاصيل الاشتراك</CardTitle>
        </CardHeader>
        <CardContent>
          <DataLoader />
        </CardContent>
      </Card>
    );

  const notifications = subscription?.data.features_usages.find(
    (feature) => feature.name === "استقبال الاشعارات"
  );
  return (
    <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted my-2 shadow-xs">
      <CardHeader>
        <CardTitle>تفاصيل الاشتراك</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          className="flex flex-col gap-4"
        >
          <p className="text-dark font-semibold dark:text-white">
            <span className="text-dark/70 font-medium dark:text-white/70">
              الخطة:{" "}
            </span>
            {subscription?.data.plan}
          </p>
          <p className="text-dark font-semibold dark:text-white">
            <span className="text-dark/70 font-medium dark:text-white/70">
              تاريخ بداية الاشتراك:{" "}
            </span>
            {formatDateTime(subscription?.data.start_at as string)}
          </p>
          <p className="text-dark font-semibold dark:text-white">
            <span className="text-dark/70 font-medium dark:text-white/70">
              تاريخ انتهاء الاشتراك:{" "}
            </span>
            {formatDateTime(subscription?.data.ends_at as string)}
          </p>
          <p className="text-dark font-semibold dark:text-white">
            <span className="text-dark/70 font-medium dark:text-white/70">
              استقبال الإشعارات:{" "}
            </span>
            {notifications?.used}/{notifications?.max_value}
          </p>
        </motion.div>
        <FeaturesUsage features={subscription?.data.features_usages || []} />
      </CardContent>
    </Card>
  );
};

export default Subscription;
