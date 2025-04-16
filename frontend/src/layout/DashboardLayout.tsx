import Header from "@/components/Header";
import PathIndicator from "@/components/dashboard/PathIndicator";
import Sidebar from "@/components/dashboard/Sidebar";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import { ILink } from "@/interfaces";
import {
  BadgeDollarSign,
  Bookmark,
  Building2,
  HomeIcon,
  Settings,
  UserRoundSearch,
  Users,
  Wallet,
  Workflow,
  WorkflowIcon,
} from "lucide-react";
import { GiMedicinePills } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
import { memo } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAttachMoney, MdMedication } from "react-icons/md";
import { Outlet, ScrollRestoration } from "react-router-dom";

const DashboardLayout = () => {
  // Codes
  const canViewClinics = useHasPermission(PERMISSIONS.CLINICS);
  const canViewDoctors = useHasPermission(PERMISSIONS.DOCTORS);
  const canViewEmployees = useHasPermission(PERMISSIONS.EMPLOYEES);
  const canViewPatients = useHasPermission(PERMISSIONS.PATIENTS);
  const canViewTreasuries = useHasPermission(PERMISSIONS.TREASURIES);
  // Operations
  const canViewExpenses = useHasPermission(PERMISSIONS.EXPENSES);
  const canViewExpensesCategories = useHasPermission(
    PERMISSIONS.EXPENSE_CATEGORIES
  );
  const canViewTransactions = useHasPermission(PERMISSIONS.TRANSACTIONS);
  // Bookings
  const canViewBookings = useHasPermission(PERMISSIONS.BOOKINGS);

  // Dosages
  const canViewDosages = useHasPermission(PERMISSIONS.DOSAGES);

  const routeNames: Record<string, string> = {
    dashboard: "الرئيسية",
    clinics: "العيادات",
    doctors: "الأطباء",
    "working-days": "ايام العمل",
    create: "إضافة",
    update: "تعديل",
    employees: "الموظفين",
    patients: "المرضى",
    drugs: "الأدوية",
    treasuries: "الخزائن",
    expenses: "المصروفات",
    "expenses-categories": "تصنيفات المصروفات",
    bookings: "الحجوزات",
    transactions: "التحصيلات",
    "last-visits": "أخر الزيارات",
    analytics: "التحاليل",
    scans: "الأشعات",
    dosages: "الجرعات",
  };

  const NAV_LINKS: ILink[] = [
    {
      name: routeNames.dashboard,
      path: "/dashboard",
      icon: <HomeIcon size={18} />,
    },
    // Booking
    ...(canViewBookings
      ? [
          {
            name: "الحجوزات",
            path: "/dashboard/bookings",
            icon: <Bookmark size={18} />,
          },
        ]
      : []),
    // Codes
    ...(canViewClinics || canViewDoctors || canViewEmployees || canViewPatients
      ? [
          {
            name: "التكويدات",
            path: "",
            icon: <Settings size={18} />,
            children: [
              ...(canViewClinics
                ? [
                    {
                      name: routeNames.clinics,
                      path: "/dashboard/clinics",
                      icon: <Building2 size={18} />,
                    },
                  ]
                : []),
              ...(canViewDoctors
                ? [
                    {
                      name: routeNames.doctors,
                      path: "/dashboard/doctors",
                      icon: <FaUserDoctor size={18} />,
                    },
                  ]
                : []),
              ...(canViewEmployees
                ? [
                    {
                      name: routeNames.employees,
                      path: "/dashboard/employees",
                      icon: <WorkflowIcon />,
                    },
                  ]
                : []),
              ...(canViewPatients
                ? [
                    {
                      name: routeNames.patients,
                      path: "/dashboard/patients",
                      icon: <Users size={18} />,
                    },
                  ]
                : []),
              ...(canViewTreasuries
                ? [
                    {
                      name: routeNames.treasuries,
                      path: "/dashboard/treasuries",
                      icon: <Wallet size={18} />,
                    },
                  ]
                : []),
              ...(canViewExpensesCategories
                ? [
                    {
                      name: routeNames["expenses-categories"],
                      path: "/dashboard/expenses-categories",
                      icon: <Workflow size={18} />,
                    },
                  ]
                : []),
              // Dosages
              ...(canViewDosages
                ? [
                    {
                      name: routeNames.dosages,
                      path: "/dashboard/dosages",
                      icon: <GiMedicinePills size={18} />,
                    },
                  ]
                : []),
            ],
          },
        ]
      : []),

    // Operations
    ...(canViewExpenses
      ? [
          {
            name: "الحسابات",
            path: "",
            icon: <MdAttachMoney size={18} />,
            children: [
              ...(canViewExpenses
                ? [
                    {
                      name: routeNames.expenses,
                      path: "/dashboard/expenses",
                      icon: <MdAttachMoney size={18} />,
                    },
                  ]
                : []),
              ...(canViewTransactions
                ? [
                    {
                      name: routeNames.transactions,
                      path: "/dashboard/transactions",
                      icon: <BadgeDollarSign size={18} />,
                    },
                  ]
                : []),
            ],
          },
        ]
      : []),

    // Drugs
    {
      name: routeNames.drugs,
      path: "/dashboard/drugs",
      icon: <MdMedication size={18} />,
    },
    // Analytics
    {
      name: routeNames.analytics,
      path: "/dashboard/analytics",
      icon: <TbReportAnalytics size={18} />,
    },
    {
      name: routeNames.scans,
      path: "/dashboard/scans",
      icon: <UserRoundSearch size={18} />,
    },
  ];

  return (
    <div className="flex bg-foreground">
      <ScrollRestoration />
      <div className="fixed inset-y-0 right-0">
        <Sidebar links={NAV_LINKS} />
      </div>
      <div className="bg-background min-h-screen flex-1 flex flex-col overflow-hidden lg:mr-[270px] border-r border-primary/30 dark:border-primary/20 lg:rounded-tr-[36px] lg:rounded-br-[36px]">
        <div className="container">
          <Header links={NAV_LINKS} dashboard />
          <main className="flex-1 mt-20 lg:mt-6 bg-background">
            <PathIndicator routeNames={routeNames} />
            <div className="my-3">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default memo(DashboardLayout);
