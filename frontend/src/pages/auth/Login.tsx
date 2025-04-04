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
import { loginSchema } from "@/validations/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import handleResErr from "@/utils/handleResponseError";

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
          user: {
            role: data.role,
            id: data.id,
            name: data.name,
          },
        })
      );
      dispatch(setPermissions(data.permissions));
      return toast.success(message);
    } catch (error) {
      handleResErr(error);
    }
  };
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تسجيل الدخول</title>
      </Helmet>

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
          className="space-y-3 w-full max-w-md md:max-w-sm"
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
                        <FormLabel className="text-black" htmlFor={input.name}>
                          {input.label}
                        </FormLabel>
                        <FormControl>
                          <Input
                            id={input.name}
                            placeholder={input.placeholder}
                            type={input.type}
                            {...field}
                            className="px-2 py-3 focus-visible:ring-[#bababa] placeholder:h-14 h-auto border-black/20 text-black placeholder:text-black/50"
                          />
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
            className="h-auto bg-[#16a0cf] hover:bg-[#16a0cf]/90 text-[#fff] w-full py-3 px-4 flex justify-center items-center gap-4"
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
    </>
  );
};

export default Login;
