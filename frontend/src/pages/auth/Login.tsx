import { login } from "@/store/features/auth/authSlice";
import { setPermissions } from "@/store/features/permissions/permissionsSlice";
import ToggleMode from "@/components/ToggleMode";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LOGIN_FORM_INPUTS } from "@/constants";
import { useLogin } from "@/lib/react-query/auth/auth";
import loginSchema from "@/validations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const Login = () => {
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
      if (!status) return toast.error(message);

      // * Login Success
      dispatch(
        login({
          token: data.token,
          role: data.role,
        })
      );
      dispatch(setPermissions(data.permissions));
      return toast.success(message);
    } catch (error) {
      const errorObj = error as AxiosError<{ message: string }>;
      if (errorObj.response?.data)
        toast.error(errorObj.response?.data.message || "هناك خطأ حاول لاحقا");
    }
  };

  return (
    <>
      <Helmet>
        <title>EgProg | تسجيل الدخول</title>
      </Helmet>
      <div className="relative min-h-screen">
        <div className="absolute bg-black/20 dark:bg-transparent inset-0 bg-[url(/login-bg.svg)] bg-cover bg-left filter blur-sm -z-50" />
        <div className="px-1 lg:px-0 bg-[url(login-img.svg)] bg-no-repeat bg-center bg-cover min-h-screen flex justify-center items-center text-white">
          <div className="py-9 px-4 md:px-6 max-w-md w-full rounded-xl shadow-lg bg-white dark:bg-foreground border border-black/20 dark:border-white/20">
            <div className="relative">
              <div className="absolute top-0 right-0">
                <ToggleMode />
              </div>
            </div>
            <div className="flex justify-center items-center max-w-28 mx-auto">
              <img src="/logo.svg" alt="logo" className="max-w-full" />
            </div>
            <h1 className="my-3 text-black dark:text-white font-bold text-center text-xl">
              تسجيل الدخول
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 text-white dark:text-white"
              >
                {LOGIN_FORM_INPUTS.map(({ label, name, type }, idx) => (
                  <FormField
                    key={idx}
                    control={form.control}
                    name={name as "email" | "password"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black dark:text-white">
                          {label}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={label}
                            type={type}
                            {...field}
                            className="py-3 placeholder:h-14 h-auto border-black/20 text-black dark:text-white dark:border-white/40 placeholder:text-black/50 dark:placeholder:text-white/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="submit"
                  className="py-6 w-full text-base"
                  disabled={isPending}
                >
                  تسجيل الدخول
                  {isPending && <Loader2 className="animate-spin" />}
                </Button>
              </form>
            </Form>
            <p className="mt-2 text-sm text-black dark:text-white/80">
              ليس لديك حساب؟{" "}
              <Link
                to={"/register"}
                className="underline text-[#000] dark:text-white"
              >
                تسجيل حساب جديد
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
