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
} from "lucide-react";
import { GiMedicinePills } from "react-icons/gi";
import { TbReportAnalytics, TbReportMedical } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAttachMoney, MdMedication } from "react-icons/md";
import { Outlet, ScrollRestoration } from "react-router-dom";
import ROUTES_NAME from "@/constants/routesName";
import { HiOutlineUsers } from "react-icons/hi2";
import cookieServices from "@/utils/cookieServices";

const DashboardLayout = () => {
  const user = cookieServices.getUser()!;
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

  // Prescriptions
  const canViewPrescriptions = useHasPermission(PERMISSIONS.PRESCRIPTIONS);

  const NAV_LINKS: ILink[] = [
    ...(user.role === "admin"
      ? [
          {
            name: ROUTES_NAME.dashboard,
            path: "/dashboard",
            icon: <HomeIcon size={18} />,
          },
        ]
      : []),
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
    ...(canViewClinics ||
    canViewDoctors ||
    canViewEmployees ||
    canViewPatients ||
    canViewDosages ||
    canViewTreasuries ||
    canViewExpensesCategories
      ? [
          {
            name: "التكويدات",
            path: "",
            icon: <Settings size={18} />,
            children: [
              ...(canViewClinics
                ? [
                    {
                      name: ROUTES_NAME.clinics,
                      path: "/dashboard/clinics",
                      icon: <Building2 size={18} />,
                    },
                  ]
                : []),
              ...(canViewDoctors
                ? [
                    {
                      name: ROUTES_NAME.doctors,
                      path: "/dashboard/doctors",
                      icon: <FaUserDoctor size={18} />,
                    },
                  ]
                : []),
              ...(canViewEmployees
                ? [
                    {
                      name: ROUTES_NAME.employees,
                      path: "/dashboard/employees",
                      icon: <HiOutlineUsers size={18} />,
                    },
                  ]
                : []),
              ...(canViewPatients
                ? [
                    {
                      name: ROUTES_NAME.patients,
                      path: "/dashboard/patients",
                      icon: <Users size={18} />,
                    },
                  ]
                : []),
              // Dosages
              ...(canViewDosages
                ? [
                    {
                      name: ROUTES_NAME.dosages,
                      path: "/dashboard/dosages",
                      icon: <GiMedicinePills size={18} />,
                    },
                  ]
                : []),
              ...(canViewTreasuries
                ? [
                    {
                      name: ROUTES_NAME.treasuries,
                      path: "/dashboard/treasuries",
                      icon: <Wallet size={18} />,
                    },
                  ]
                : []),
              ...(canViewExpensesCategories
                ? [
                    {
                      name: ROUTES_NAME["expenses-categories"],
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
    ...(canViewExpenses || canViewTransactions
      ? [
          {
            name: "الحسابات",
            path: "",
            icon: <MdAttachMoney size={18} />,
            children: [
              ...(canViewExpenses
                ? [
                    {
                      name: ROUTES_NAME.expenses,
                      path: "/dashboard/expenses",
                      icon: <MdAttachMoney size={18} />,
                    },
                  ]
                : []),
              ...(canViewTransactions
                ? [
                    {
                      name: ROUTES_NAME.transactions,
                      path: "/dashboard/transactions",
                      icon: <BadgeDollarSign size={18} />,
                    },
                  ]
                : []),
            ],
          },
        ]
      : []),
    // Prescriptions
    ...(canViewPrescriptions
      ? [
          {
            name: ROUTES_NAME.prescriptions,
            path: "/dashboard/prescriptions",
            icon: <TbReportMedical size={18} />,
          },
        ]
      : []),

    // Drugs
    {
      name: ROUTES_NAME.drugs,
      path: "/dashboard/drugs",
      icon: <MdMedication size={18} />,
    },
    // Analytics
    {
      name: ROUTES_NAME.analytics,
      path: "/dashboard/analytics",
      icon: <TbReportAnalytics size={18} />,
    },
    // Scans
    {
      name: ROUTES_NAME.scans,
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
      <div className="bg-background min-h-screen flex-1 flex flex-col overflow-hidden lg:mr-[270px] lg:border-r border-primary/30 lg:dark:border-primary/20 lg:rounded-tr-[36px] lg:rounded-br-[36px]">
        <div className="container">
          <Header links={NAV_LINKS} dashboard />
          <main className="flex-1 mt-20 lg:mt-6 bg-background">
            <PathIndicator routeNames={ROUTES_NAME} />
            <div className="my-3">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
