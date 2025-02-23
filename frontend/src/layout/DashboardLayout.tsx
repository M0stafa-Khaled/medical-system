import { logout } from "@/app/features/auth/authSlice";
import { setPermissions } from "@/app/features/permissions/permissionsSlice";
import Navbar from "@/components/Navbar";
import PathIndicator from "@/components/dashboard/PathIndicator";
import Sidebar from "@/components/dashboard/Sidebar";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import { useCheckAuth } from "@/lib/react-query/auth";
import cookieServices from "@/utils/cookieServices";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const canViewClinics = useHasPermission(PERMISSIONS.CLINICS);
  const canViewDoctors = useHasPermission(PERMISSIONS.DOCTORS);
  const canViewEmployees = useHasPermission(PERMISSIONS.EMPLOYEES);
  const canViewPatients = useHasPermission(PERMISSIONS.PATIENTS);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = cookieServices.getToken();
  const { mutateAsync: checkAuthUser } = useCheckAuth();

  const routeNames = {
    dashboard: "الرئيسية",
    clinics: "العيادات",
    doctors: "الأطباء",
    add: "إضافة",
    update: "تعديل",
    employees: "الموظفين",
    patients: "المرضى",
  };

  const NAV_LINKS = [
    {
      name: routeNames.dashboard,
      path: "/dashboard",
    },
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
            ],
          },
        ]
      : []),
  ];

  useEffect(() => {
    (async () => {
      const { auth, email_verified, status, permissions } = await checkAuthUser(
        token as string
      );
      if (!auth) {
        dispatch(logout());
        navigate("/login");
        return toast.warn(" تم تسجيل الخروج يرجى تسجيل الدخول مرة اخرى");
      }

      // Set Permissions in state
      dispatch(setPermissions(permissions));

      if (!status) {
        navigate("/not-active");
        return toast.warn("حسابك غير مفعل يرجى التواصل مع الادارة");
      }

      if (!email_verified) {
        navigate("/verify-email");
        return toast.warn("يرجى تاكيد البريد الالكتروني");
      }
    })();
    return;
  }, [checkAuthUser, token, navigate, dispatch]);

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
