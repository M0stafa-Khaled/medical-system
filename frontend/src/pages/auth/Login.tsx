import { login } from "@/app/features/auth/authSlice";
import ReverseProtectedRoute from "@/components/auth/ReverseProtectedRoute";
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
import { useLoginAdmin } from "@/lib/react-query/auth";
import loginSchema from "@/validations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutateAsync: loginAdmin, isPending } = useLoginAdmin();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: z.infer<typeof loginSchema>) => {
    try {
      const { status, message, data } = await loginAdmin({
        email,
        password,
        role: "admin",
      });

      // ! Login Field
      if (!status) return toast.error(message);
      // * Login Success
      console.log(data);
      toast.success(message);
      dispatch(login({ token: data.token, role: "admin" }));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      const errorObj = error as AxiosError<{ message: string }>;
      toast.error(errorObj.message || "هناك خطأ حاول لاحقا");
    }
  };

  return (
    <ReverseProtectedRoute>
      <div className="relative min-h-screen">
        <div className="absolute bg-black/20 dark:bg-transparent inset-0 bg-[url(/login-bg.svg)] bg-cover bg-center filter blur-sm -z-50" />
        <div className="px-2 lg:px-0 bg-[url(login-img.svg)] bg-no-repeat bg-center bg-cover min-h-screen flex justify-center items-center text-white">
          <div
            className="py-9 px-6 max-w-md w-full rounded-xl shadow-lg bg-[rgba(200,206,212,0.3)] dark:bg-[rgba(139,139,139,0.36)] border border-black/20 dark:border-white/40"
            style={{
              backdropFilter: "blur( 8.5px )",
              WebkitBackdropFilter: "blur( 8.5px )",
            }}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 text-white dark:text-white"
              >
                {LOGIN_FORM_INPUTS.map(({ label, name, type }, idx) => (
                  <FormField
                    key={idx}
                    control={form.control}
                    name={name as "email" | "password"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white dark:text-white">
                          {label}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={label}
                            type={type}
                            {...field}
                            className="py-3 placeholder:h-14 h-auto border-black/20 text-black dark:text-white dark:border-white/40 placeholder:text-black/50 focus-visible:ring-0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="submit"
                  className="py-6 w-full !text-base !font-normal"
                  disabled={isPending}
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
          </div>
        </div>
      </div>
    </ReverseProtectedRoute>
  );
};

export default Login;
