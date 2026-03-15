import { PERMISSIONS } from "@/shared/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import NotFound from "@/pages/NotFound";
import { Helmet } from "react-helmet-async";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import {
  LucideBuilding2,
  LucideCreditCard,
  LucideSettings,
} from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants } from "@/shared/animations";
import { CompanyInfo } from "../components/CompanyInfo";
import { Subscription } from "../components/Subscription";

const Settings = () => {
  const canViewCompanyInfo = useHasPermission(PERMISSIONS.COMPANY_INFO);
  const canViewSubscription = useHasPermission(PERMISSIONS.SUBSCRIPTION);

  if (!canViewCompanyInfo && !canViewSubscription) return <NotFound />;

  const showBoth = canViewCompanyInfo && canViewSubscription;
  const defaultTab = canViewCompanyInfo ? "company" : "subscription";

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | الإعدادات</title>
      </Helmet>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-slate-600 to-slate-700 shadow-lg">
              <LucideSettings className="h-5 w-5 text-white" />
            </div>
            الإعدادات
          </h1>
          <p className="text-muted-foreground">إدارة إعدادات ومعلومات المركز</p>
        </div>

        {showBoth ? (
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="mb-4 grid h-auto w-full grid-cols-2 gap-2">
              <TabsTrigger value="company" className="gap-2 py-2.5">
                <LucideBuilding2 className="h-4 w-4" />
                بيانات المركز
              </TabsTrigger>
              <TabsTrigger value="subscription" className="gap-2 py-2.5">
                <LucideCreditCard className="h-4 w-4" />
                الاشتراك
              </TabsTrigger>
            </TabsList>

            <TabsContent value="company">
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <LucideBuilding2 className="h-5 w-5" />
                    بيانات المركز
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <CompanyInfo />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscription">
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <LucideCreditCard className="h-5 w-5" />
                    تفاصيل الاشتراك
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <Subscription />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : canViewCompanyInfo ? (
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <LucideBuilding2 className="h-5 w-5" />
                بيانات المركز
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <CompanyInfo />
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <LucideCreditCard className="h-5 w-5" />
                تفاصيل الاشتراك
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Subscription />
            </CardContent>
          </Card>
        )}
      </motion.section>
    </>
  );
};

export default Settings;
