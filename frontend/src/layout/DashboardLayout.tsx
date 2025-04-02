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
  Users,
  Wallet,
  Workflow,
  WorkflowIcon,
} from "lucide-react";
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
      name: "الأدوية",
      path: "/dashboard/drugs",
      icon: <MdMedication size={18} />,
    },
  ];

  return (
    <div className="flex container">
      <Header links={NAV_LINKS} dashboard />
      <ScrollRestoration />
      <Sidebar links={NAV_LINKS} />
      <main className="flex-1 mt-20 lg:mt-6 bg-background flex flex-col overflow-hidden lg:mr-[275px]">
        <PathIndicator routeNames={routeNames} />
        <div className="my-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default memo(DashboardLayout);
