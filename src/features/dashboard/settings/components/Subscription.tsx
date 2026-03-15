import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useGetSubscription } from "../queriesAndMutations";
import formatDateTime from "@/shared/utils/formatDate";
import DataLoader from "@/shared/components/ui/DataLoader";
import { containerVariants } from "@/shared/animations";
import { motion } from "framer-motion";
import { FeaturesUsage } from "./FeaturesUsage";

export const Subscription = () => {
  const { data: subscription, isLoading } = useGetSubscription();

  if (isLoading)
    return (
      <Card className="border-muted">
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
    <>
      <motion.div variants={containerVariants} className="flex flex-col gap-4">
        <p className="font-semibold">
          <span className="font-medium">الخطة: </span>
          {subscription?.data.plan}
        </p>
        <p className="font-semibold">
          <span className="font-medium">تاريخ بداية الاشتراك: </span>
          {formatDateTime(subscription?.data.start_at as string)}
        </p>
        <p className="font-semibold">
          <span className="font-medium">تاريخ انتهاء الاشتراك: </span>
          {formatDateTime(subscription?.data.ends_at as string)}
        </p>
        <p className="font-semibold">
          <span className="font-medium">استقبال الإشعارات: </span>
          {notifications?.used}/{notifications?.max_value}
        </p>
      </motion.div>
      <FeaturesUsage features={subscription?.data.features_usages || []} />
    </>
  );
};
