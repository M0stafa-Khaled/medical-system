import Navbar from "@/components/Navbar";
import PathIndicator from "@/components/dashboard/PathIndicator";
import Sidebar from "@/components/dashboard/Sidebar";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import path from "path";
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
  const canViewBooking = useHasPermission(PERMISSIONS.BOOKING);

  const routeNames: Record<string, string> = {
    dashboard: "الرئيسية",
    clinics: "العيادات",
    doctors: "الأطباء",
    "working-days": "ايام العمل",
    add: "إضافة",
    create: "إضافة",
    update: "تعديل",
    employees: "الموظفين",
    patients: "المرضى",
    drugs: "الأدوية",
    treasuries: "الخزائن",
    expenses: "المصروفات",
    "expenses-categories": "تصنيفات المصروفات",
    booking: "الحجوزات",
  };

  interface INavLink {
    name: string;
    path: string;
    children?: INavLink[];
  }

  const NAV_LINKS: INavLink[] = [
    {
      name: routeNames.dashboard,
      path: "/dashboard",
    },
    // Codes
    ...(canViewClinics || canViewDoctors || canViewEmployees || canViewPatients
      ? [
          {
            name: "التكويدات",
            path: "",
            children: [
              ...(canViewClinics
                ? [{ name: routeNames.clinics, path: "/dashboard/clinics" }]
                : []),
              ...(canViewDoctors
                ? [{ name: routeNames.doctors, path: "/dashboard/doctors" }]
                : []),
              ...(canViewEmployees
                ? [{ name: routeNames.employees, path: "/dashboard/employees" }]
                : []),
              ...(canViewPatients
                ? [{ name: routeNames.patients, path: "/dashboard/patients" }]
                : []),
              ...(canViewTreasuries
                ? [
                    {
                      name: routeNames.treasuries,
                      path: "/dashboard/treasuries",
                    },
                  ]
                : []),
              ...(canViewExpensesCategories
                ? [
                    {
                      name: routeNames["expenses-categories"],
                      path: "/dashboard/expenses-categories",
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
            children: [
              ...(canViewExpenses
                ? [
                    {
                      name: routeNames.expenses,
                      path: "/dashboard/expenses",
                    },
                  ]
                : []),
            ],
          },
        ]
      : []),

    // Medications
    { name: "الأدوية", path: "/dashboard/drugs" },
  ];

  return (
    <div className="flex font-sans">
      <ScrollRestoration />
      <div className="fixed inset-y-0 right-0 overflow-y-auto">
        <Sidebar links={NAV_LINKS} />
      </div>
      <div className="container flex-1 flex flex-col overflow-hidden lg:mr-[275px]">
        <Navbar links={NAV_LINKS} dashboard />
        <main className="flex-1 mt-20 lg:mt-6 bg-background">
          <PathIndicator routeNames={routeNames} />
          <div className="my-5">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
