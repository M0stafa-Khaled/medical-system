import { logout } from "@/app/store/features/auth/authSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import useNetworkStatus from "@/shared/hooks/useNetworkStatus";
import cookieServices from "@/shared/utils/cookieServices";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useCheckAuth } from "@/features/auth/queriesAndMutations";
import { Helmet } from "react-helmet-async";
import { VerifyAccountForm } from "../components/VerifyAccountForm";

const VerifyAccount = () => {
  useNetworkStatus();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = cookieServices.getToken()!;
  const role = cookieServices.getUser()?.role;
  const { mutateAsync: checkAuth } = useCheckAuth();

  useEffect(() => {
    (async () => {
      const { auth, email_verified } = await checkAuth();

      if (!auth) {
        dispatch(logout());
        navigate("/login");
        return;
      }
      if (email_verified && (role === "admin" || role === "employee"))
        navigate("/dashboard");
      if (email_verified && role === "patient") navigate("/bookings");
      if (email_verified && role === "doctor") navigate("/doctor");
    })();
  }, [navigate, dispatch, role, checkAuth, token]);

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تأكيد الحساب</title>
      </Helmet>
      <main className="container flex min-h-screen items-center justify-center py-4">
        <Card className="border-muted">
          <div className="mx-auto flex max-w-xs items-center justify-center">
            <img
              src="/images/verify-email.svg"
              alt="verify email"
              className="w-56"
            />
          </div>
          <CardHeader className="text-center">
            <CardTitle className="leading-relaxed">
              تأكيد البريد الإلكتروني
            </CardTitle>
            <CardDescription className="leading-relaxed">
              الرجاء إدخال رمز التحقق المرسل إلى بريدك الإلكتروني
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VerifyAccountForm />
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default VerifyAccount;
