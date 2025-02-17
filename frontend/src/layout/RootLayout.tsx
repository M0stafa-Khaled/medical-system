import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCheckAuth } from "@/lib/react-query/auth";
import { useEffect } from "react";
import cookieServices from "@/utils/cookieServices";
import { logout } from "@/app/features/auth/authSlice";

const RootLayout = () => {
  const token = cookieServices.getToken();
  const role = cookieServices.getRole();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutateAsync: checkAuthUser } = useCheckAuth();

  useEffect(() => {
    if (token) {
      (async () => {
        const { auth } = await checkAuthUser(token as string);
        if (!auth) dispatch(logout());
      })();
    }
  }, [token, dispatch, navigate, checkAuthUser]);

  const navLinks = [
    ...(["admin", "employee"].includes(role!)
      ? [
          {
            name: "لوحة التحكم",
            path: "/dashboard/",
          },
        ]
      : []),
    {
      name: "الرئيسية",
      path: "/",
    },
  ];

  return (
    <div>
      <ScrollRestoration />
      <Navbar links={navLinks} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
