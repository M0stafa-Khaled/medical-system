import Navbar from "@/shared/components/navigation/navbar/Navbar";
import { PERMISSIONS } from "@/shared/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { ILink } from "@/shared/types";
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
import { Outlet, ScrollRestoration } from "react-router";
import { HiOutlineUsers } from "react-icons/hi2";
import PathIndicator from "../../shared/components/navigation/PathIndicator";
import Sidebar from "../../shared/components/navigation/Sidebar";
import { ROUTES_NAME } from "@/shared/constants";
import { NotificationsMenu } from "../notifications";
import { ProfileMenu } from "../profile";
import ToggleTheme from "@/shared/components/ToggleTheme";
import { useAppSelector } from "@/app/store";

const DashboardLayout = () => {
  // Codes
  const canViewClinics = useHasPermission(PERMISSIONS.CLINICS);
  const canViewDoctors = useHasPermission(PERMISSIONS.DOCTORS);
  const canViewDoctorTransactions = useHasPermission(
    PERMISSIONS.DOCTOR_TRANSACTIONS
  );
  const canViewEmployees = useHasPermission(PERMISSIONS.EMPLOYEES);
  const canViewPatients = useHasPermission(PERMISSIONS.PATIENTS);
  const canViewTreasuries = useHasPermission(PERMISSIONS.TREASURIES);
  const canViewDosages = useHasPermission(PERMISSIONS.DOSAGES);
  const canViewExpensesCategories = useHasPermission(
    PERMISSIONS.EXPENSE_CATEGORIES
  );
  const canViewCodes =
    canViewClinics ||
    canViewDoctors ||
    canViewEmployees ||
    canViewPatients ||
    canViewDosages ||
    canViewTreasuries ||
    canViewExpensesCategories;

  // Operations
  const canViewExpenses = useHasPermission(PERMISSIONS.EXPENSES);
  const canViewTransactions = useHasPermission(PERMISSIONS.TRANSACTIONS);

  // Bookings
  const canViewBookings = useHasPermission(PERMISSIONS.BOOKINGS);

  // Prescriptions
  const canViewPrescriptions = useHasPermission(PERMISSIONS.PRESCRIPTIONS);

  // Reports
  const canViewTransactionsReports = useHasPermission(
    PERMISSIONS.TRANSACTIONS_REPORTS
  );
  const canViewBookingsReports = useHasPermission(PERMISSIONS.BOOKINGS_REPORTS);
  const canViewExpensesReports = useHasPermission(PERMISSIONS.EXPENSES_REPORTS);
  const canViewPrescriptionsReports = useHasPermission(
    PERMISSIONS.PRESCRIPTIONS_REPORTS
  );
  const canViewTransfersReports = useHasPermission(
    PERMISSIONS.TRANSFERS_REPORTS
  );
  const canViewTreasuriesReports = useHasPermission(
    PERMISSIONS.TREASURIES_REPORTS
  );
  const canViewPatientsReports = useHasPermission(PERMISSIONS.PATIENTS_REPORTS);
  const canViewPatientBalancesReports = useHasPermission(
    PERMISSIONS.PATIENT_BALANCES_REPORTS
  );
  const canViewPatientsBalances = useHasPermission(
    PERMISSIONS.PATIENT_BALANCES
  );
  const canViewReports =
    canViewTransactionsReports ||
    canViewBookingsReports ||
    canViewExpensesReports ||
    canViewPrescriptionsReports ||
    canViewTransfersReports ||
    canViewTreasuriesReports ||
    canViewPatientsReports ||
    canViewPatientBalancesReports;

  const NAV_LINKS: ILink[] = [
    {
      name: ROUTES_NAME.dashboard,
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
    ...(canViewCodes
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
              ...(canViewDoctorTransactions
                ? [
                    {
                      name: ROUTES_NAME.doctorTransactions,
                      path: "/dashboard/doctors/transactions",
                      icon: <BadgeDollarSign size={18} />,
                    },
                  ]
                : []),
              ...(canViewPatientsBalances
                ? [
                    {
                      name: ROUTES_NAME.patientsBalances,
                      path: "/dashboard/patients/transactions",
                      icon: <BadgeDollarSign size={18} />,
                    },
                  ]
                : []),
            ],
          },
        ]
      : []),
    // Reports
    ...(canViewReports
      ? [
          {
            name: ROUTES_NAME.reports,
            path: "",
            icon: <TbReportAnalytics size={18} />,
            children: [
              ...(canViewTransactionsReports
                ? [
                    {
                      name: ROUTES_NAME.transactionsReports,
                      path: "/dashboard/reports/transactions",
                      icon: <BadgeDollarSign size={18} />,
                    },
                  ]
                : []),
              ...(canViewBookingsReports
                ? [
                    {
                      name: ROUTES_NAME.bookingsReports,
                      path: "/dashboard/reports/bookings",
                      icon: <Bookmark size={18} />,
                    },
                  ]
                : []),
              ...(canViewExpensesReports
                ? [
                    {
                      name: ROUTES_NAME.expensesReports,
                      path: "/dashboard/reports/expenses",
                      icon: <MdAttachMoney size={18} />,
                    },
                  ]
                : []),
              ...(canViewTransfersReports
                ? [
                    {
                      name: ROUTES_NAME.transfersReports,
                      path: "/dashboard/reports/transfers",
                      icon: <GiMedicinePills size={18} />,
                    },
                  ]
                : []),
              ...(canViewPrescriptionsReports
                ? [
                    {
                      name: ROUTES_NAME.prescriptionsReports,
                      path: "/dashboard/reports/prescriptions",
                      icon: <TbReportMedical size={18} />,
                    },
                  ]
                : []),
              ...(canViewTreasuriesReports
                ? [
                    {
                      name: ROUTES_NAME.treasuriesReports,
                      path: "/dashboard/reports/treasuries",
                      icon: <Wallet size={18} />,
                    },
                  ]
                : []),
              ...(canViewPatientsReports
                ? [
                    {
                      name: ROUTES_NAME.patientsReports,
                      path: "/dashboard/reports/patients",
                      icon: <Users size={18} />,
                    },
                  ]
                : []),
              ...(canViewPatientBalancesReports
                ? [
                    {
                      name: ROUTES_NAME.patientBalancesReports,
                      path: "/dashboard/reports/patient-balances",
                      icon: <Users size={18} />,
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
    // analysis
    {
      name: ROUTES_NAME.analysis,
      path: "/dashboard/analysis",
      icon: <TbReportAnalytics size={18} />,
    },
    // Scans
    {
      name: ROUTES_NAME.scans,
      path: "/dashboard/scans",
      icon: <UserRoundSearch size={18} />,
    },
  ];

  const { user } = useAppSelector((state) => state.auth);
  const canReceiveNotifications = useHasPermission(
    PERMISSIONS.RECEIVE_NOTIFICATIONS
  );
  return (
    <div className="flex">
      <ScrollRestoration
        getKey={(location) => {
          if (location.pathname === "/dashboard") {
            return location.pathname;
          }
          return location.key;
        }}
      />

      <div className="fixed inset-y-0 right-0">
        <Sidebar links={NAV_LINKS} />
      </div>

      <div className="bg-background border-border flex min-h-screen w-full flex-1 flex-col overflow-hidden lg:mr-67 lg:w-auto lg:border-r">
        <div className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 container hidden h-16 w-full items-center justify-between gap-4 border-b backdrop-blur lg:flex">
          <div className="flex items-center gap-4">
            <PathIndicator routeNames={ROUTES_NAME} />
          </div>

          <div className="flex items-center justify-center gap-3">
            {user?.user?.role !== "doctor" && canReceiveNotifications && (
              <NotificationsMenu />
            )}
            <ProfileMenu />
            <ToggleTheme />
          </div>
        </div>

        <Navbar links={NAV_LINKS} dashboard />

        <div className="container mt-15 lg:mt-3">
          <main className="flex-1">
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
