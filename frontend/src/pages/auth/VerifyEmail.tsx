import { logout } from "@/store/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import {
  useCheckAuth,
  useResendOtp,
  useVerifyEmail,
} from "@/lib/react-query/auth/auth";
import cookieServices from "@/utils/cookieServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as z from "zod";
import { clearPermissions } from "@/store/features/permissions/permissionsSlice";
import { Helmet } from "react-helmet-async";
import { AxiosError } from "axios";

const formSchema = z.object({
  otp: z
    .string()
    .min(6, "يجب إدخال رمز التحقق")
    .max(6, "يجب إدخال رمز التحقق "),
});

type FormValues = z.infer<typeof formSchema>;

const VerifyEmail = () => {
  useNetworkStatus();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = cookieServices.getToken()!;
  const role = cookieServices.getRole()!;
  const { mutateAsync: checkAuth } = useCheckAuth();

  const { mutateAsync: resendOtp, isPending: isLoadingResendOtp } =
    useResendOtp();
  const { mutateAsync: verifyEmail, isPending: isLoadingVerifyEmail } =
    useVerifyEmail();

  useEffect(() => {
    (async () => {
      const { auth, email_verified } = await checkAuth(token);

      if (!auth) {
        dispatch(logout());
        dispatch(clearPermissions());
        navigate("/login");
        return;
      }
      if (email_verified && (role === "admin" || role === "employee"))
        navigate("/dashboard");
      if (email_verified && role === "patient") navigate("/bookings");
      if (email_verified && role === "doctor") navigate("/doctor");
    })();
  }, [navigate, dispatch, role, checkAuth, token]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const { status, message } = await verifyEmail({
        token: token as string,
        otp: values.otp,
      });
      if (!status) return toast.error(message);
      toast.success("تم تأكيد البريد الإلكتروني بنجاح");
      navigate("/");
    } catch (error) {
      const errorObj = error as AxiosError<{
        message: { [key: string]: string[] };
      }>;
      if (typeof errorObj?.response?.data.message === "object") {
        Object.keys(errorObj.response.data.message).forEach((key) => {
          errorObj?.response?.data.message[key].forEach((error) =>
            toast.error(error, {
              autoClose: 5000,
            })
          );
        });
      }
      if (typeof errorObj?.response?.data.message === "string")
        toast.error(errorObj?.response?.data.message, {
          autoClose: 5000,
        });
    }
  };

  const handleResendOtp = async () => {
    try {
      const { message, status } = await resendOtp(token as string);
      if (!status) return toast.error(message);

      toast.success("تم ارسال رمز التحقق مرة اخرى");
    } catch (error) {
      const errorObj = error as AxiosError<{
        message: { [key: string]: string[] };
      }>;
      if (typeof errorObj?.response?.data.message === "object") {
        Object.keys(errorObj.response.data.message).forEach((key) => {
          errorObj?.response?.data.message[key].forEach((error) =>
            toast.error(error, {
              autoClose: 5000,
            })
          );
        });
      }
      if (typeof errorObj?.response?.data.message === "string")
        toast.error(errorObj?.response?.data.message, {
          autoClose: 5000,
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تأكيد الحساب</title>
      </Helmet>
      <main className="container flex items-center justify-center min-h-screen">
        <Card className="border-muted bg-foreground shadow-none">
          <div className="flex justify-center items-center max-w-xs mx-auto">
            <img src="/verify-email.svg" alt="verify email" className="w-56" />
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex justify-center " dir="ltr">
                          <InputOTP
                            maxLength={6}
                            value={field.value}
                            onChange={field.onChange}
                            autoFocus
                          >
                            <InputOTPGroup>
                              <InputOTPSlot
                                index={0}
                                className="border-muted w-12 h-12"
                              />
                              <InputOTPSlot
                                index={1}
                                className="border-muted w-12 h-12"
                              />
                              <InputOTPSlot
                                index={2}
                                className="border-muted w-12 h-12"
                              />
                              <InputOTPSlot
                                index={3}
                                className="border-muted w-12 h-12"
                              />
                              <InputOTPSlot
                                index={4}
                                className="border-muted w-12 h-12"
                              />
                              <InputOTPSlot
                                index={5}
                                className="border-muted w-12 h-12"
                              />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </FormControl>
                      <FormMessage className="text-center" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-auto py-3"
                  disabled={isLoadingVerifyEmail}
                >
                  تأكيد
                </Button>
                <p className="text-center text-muted-foreground text-sm">
                  لم يصلك رمز التحقق؟{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={handleResendOtp}
                    type="button"
                    disabled={isLoadingResendOtp}
                  >
                    اضغط لإعادة الإرسال
                  </Button>
                </p>
              </form>
              <Button
                onClick={() => {
                  dispatch(logout());
                  dispatch(clearPermissions());
                  navigate("/login");
                }}
                variant={"destructive"}
                type="submit"
                className="w-full h-auto py-3 mt-2"
              >
                تسجيل الخروج
              </Button>
            </Form>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default VerifyEmail;
