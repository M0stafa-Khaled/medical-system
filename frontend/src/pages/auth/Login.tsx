import { login } from "@/store/features/auth/authSlice";
import { setPermissions } from "@/store/features/permissions/permissionsSlice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LOGIN_FORM_INPUTS } from "@/constants";
import { useLogin } from "@/lib/react-query/auth/auth";
import { loginSchema } from "@/validations/auth/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import handleResErr from "@/utils/handleResponseError";
import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutateAsync: loginUser, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "eslame.elgohary2@gmail.com",
      password: "eslame@345",
    },
  });
  const onSubmit = async ({ email, password }: z.infer<typeof loginSchema>) => {
    try {
      const { status, message, data } = await loginUser({
        email,
        password,
      });

      // ! Login failed
      if (!status)
        return Swal.fire({
          icon: "error",
          title: "خطأ",
          text: message,
        });

      if (data.role === "employee" || data.role === "admin")
        navigate("/dashboard/bookings");

      if (data.role === "patient") navigate("/bookings");

      // * Login Success
      dispatch(
        login({
          token: data.token,
          user: {
            role: data.role,
            id: data.id,
            name: data.name,
          },
        })
      );
      if (data.role === "admin" || data.role === "employee")
        dispatch(setPermissions(data.permissions));

      return Swal.fire({
        icon: "success",
        title: "تم تسجيل الدخول بنجاح",
        text: "يمكنك الآن المتابعة",
      });
    } catch (error) {
      handleResErr(error);
    }
  };
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تسجيل الدخول</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col justify-center items-center gap-2 mb-6">
          <img src="/logo.svg" alt="logo" className="w-20" />
          <h1 className="font-semibold text-black text-xl text-center">
            تسجيل الدخول
          </h1>
          <p className="text-sm font-medium text-black/70 text-center">
            مرحبا بعودتك، يرجى تسجيل الدخول للمتابعة
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 w-full max-w-md lg:max-w-full"
          >
            <div>
              <div className="space-y-4">
                {LOGIN_FORM_INPUTS.map((input) => (
                  <div className="w-full" key={input.name}>
                    <FormField
                      control={form.control}
                      name={input.name as keyof z.infer<typeof loginSchema>}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className="text-black"
                            htmlFor={input.name}
                          >
                            {input.label}
                          </FormLabel>
                          <FormControl>
                            {input.type === "password" ? (
                              <div className="relative">
                                <button
                                  type="button"
                                  className="text-black grid place-items-center absolute text-blue-gray-500 top-2/4 left-3 -translate-y-2/4 w-5 h-5"
                                >
                                  {showPassword ? (
                                    <Eye
                                      size={20}
                                      onClick={() =>
                                        setShowPassword((prev) => !prev)
                                      }
                                    />
                                  ) : (
                                    <EyeOff
                                      size={20}
                                      onClick={() =>
                                        setShowPassword((prev) => !prev)
                                      }
                                    />
                                  )}
                                </button>
                                <Input
                                  id={input.name}
                                  placeholder={input.placeholder}
                                  type={showPassword ? "text" : input.type}
                                  {...field}
                                  className="pr-2 pl-9 py-3.5 focus-visible:ring-[#bababa] placeholder:h-14 h-auto border-black/20 text-black placeholder:text-black/50"
                                />
                              </div>
                            ) : (
                              <Input
                                id={input.name}
                                placeholder={input.placeholder}
                                type={input.type}
                                {...field}
                                className="px-2 py-3.5 focus-visible:ring-[#bababa] placeholder:h-14 h-auto border-black/20 text-black placeholder:text-black/50"
                              />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
              <p className="mr-2 mt-1">
                <Link
                  to={"/forgot-password"}
                  className="text-sm underline text-black"
                >
                  هل نسيت كلمة المرور؟
                </Link>
              </p>
            </div>
            <Button
              disabled={isPending}
              className="h-auto bg-[#16a0cf] hover:bg-[#16a0cf]/90 text-[#fff] w-full py-3.5 px-4 flex justify-center items-center gap-4"
            >
              تسجيل الدخول
              {isPending && <Loader2 className="animate-spin" />}
            </Button>
          </form>
        </Form>
        <p className="mt-2 text-sm text-black">
          ليس لديك حساب؟{" "}
          <Link to={"/register"} className="underline text-[#000]">
            تسجيل حساب جديد
          </Link>
        </p>
      </motion.div>
    </>
  );
};

export default Login;
