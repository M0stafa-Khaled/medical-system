import Navbar from "@/components/Navbar";
import { useCheckAuth } from "@/lib/react-query/auth";
import { useEffect } from "react";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import cookieServices from "@/utils/cookieServices";
import { useDispatch } from "react-redux";
import { logout } from "@/app/features/auth/authSlice";

const RootLayout = () => {
  const token = cookieServices.getToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutateAsync: checkAuthUser } = useCheckAuth();

  useEffect(() => {
    (async () => {
      const { auth } = await checkAuthUser(token as string);
      if (!auth) dispatch(logout());
    })();
  }, [checkAuthUser, token, navigate, dispatch]);

  return (
    <div>
      <ScrollRestoration />
      <Navbar links={[{ name: "الصفحة الرئيسية", path: "/" }]} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
