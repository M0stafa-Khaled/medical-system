import { Skeleton } from "@/shared/components/ui/skeleton";
import cookieServices from "@/shared/utils/cookieServices";
import { motion } from "framer-motion";
import WidgetCard from "../../shared/widgets/WidgetCard";
import {
  BadgeDollarSign,
  Bookmark,
  Building2,
  Users,
  Wallet,
} from "lucide-react";
import { MdAttachMoney } from "react-icons/md";
import { FaMoneyBillTransfer, FaUserDoctor } from "react-icons/fa6";
import { TbReportMedical } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi2";
import { containerVariants, itemVariants } from "@/animations";
import { useGetAdminWidgets } from "@/shared/lib/react-query/dashboard/widgets";

const WidgetsList = () => {
  const token = cookieServices.getToken()!;
  const { data: widgets, isLoading } = useGetAdminWidgets(token);

  const widgetsArabic = {
    treasuries_count: {
      title: "الخزائن",
      path: "/dashboard/treasuries",
      icon: <Wallet size={18} />,
    },
    expenses_count: {
      title: "المصروفات",
      path: "/dashboard/expenses",
      icon: <MdAttachMoney size={18} />,
    },
    transactions_count: {
      title: "الايرادات",
      path: "/dashboard/transactions",
      icon: <BadgeDollarSign size={18} />,
    },
    transfers_count: {
      title: "التحويلات بين الخزائن",
      path: "/dashboard/treasuries",
      icon: <FaMoneyBillTransfer size={18} />,
    },
    bookings_count: {
      title: "الحجوزات",
      path: "/dashboard/bookings",
      icon: <Bookmark size={18} />,
    },
    patients_count: {
      title: "المرضى",
      path: "/dashboard/patients",
      icon: <Users size={18} />,
    },
    employees_count: {
      title: "الموظفين",
      path: "/dashboard/employees",
      icon: <HiOutlineUsers size={18} />,
    },
    doctors_count: {
      title: "الأطباء",
      path: "/dashboard/doctors",
      icon: <FaUserDoctor size={18} />,
    },
    clinics_count: {
      title: "العيادات",
      path: "/dashboard/clinics",
      icon: <Building2 size={18} />,
    },
    prescriptions_count: {
      title: "الروشتات",
      path: "/dashboard/prescriptions",
      icon: <TbReportMedical size={18} />,
    },
  };

  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileInView="visible"
    >
      {isLoading
        ? Array.from({ length: 10 }, (_, idx) => (
            <Skeleton key={idx} className="h-28 w-full" />
          ))
        : widgets?.data &&
          Object.entries(widgets.data).map(([key, value], idx) => (
            <motion.div variants={itemVariants} key={key} custom={idx}>
              <WidgetCard
                title={widgetsArabic[key as keyof typeof widgetsArabic].title}
                icon={widgetsArabic[key as keyof typeof widgetsArabic].icon}
                path={widgetsArabic[key as keyof typeof widgetsArabic].path}
                value={value}
              />
            </motion.div>
          ))}
    </motion.div>
  );
};

export default WidgetsList;
