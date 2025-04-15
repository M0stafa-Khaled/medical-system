import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { resetPasswordSchema } from "@/validations/auth/authSchema";
import { useResetPassword } from "@/lib/react-query/auth/auth";
import cookieServices from "@/utils/cookieServices";
import { RESET_PASSWORD_FORM_INPUTS } from "@/constants";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { mutateAsync: resetPassword, isPending } = useResetPassword();
  useEffect(() => {
    const canReset = cookieServices.getCanResetPass();
    if (!canReset) navigate("/forgot-password");
  }, [navigate]);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async ({
    code,
    password,
    password_confirmation,
  }: z.infer<typeof resetPasswordSchema>) => {
    try {
      const { status, message } = await resetPassword({
        code,
        password,
        password_confirmation,
      });
      // ! Rest failed
      if (!status)
        return Swal.fire({
          icon: "error",
          title: "خطأ",
          text: message,
        });

      // * Reset Success
      navigate("/login");
      cookieServices.clearCanResetPass();
      return Swal.fire({
        icon: "success",
        title: "تم",
        text: "تم إعادة تعيين كلمة المرور بنجاح",
      });
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
        <title>{import.meta.env.VITE_WEB_NAME} | هل نسيت كلمة المرور</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="flex flex-col items-center justify-center"
      >
        <div className="flex flex-col justify-center items-center gap-2 mb-6 max-w-md md:max-w-sm">
          <img src="/logo.svg" alt="logo" className="w-20" />
          <h1 className="font-semibold text-black text-xl text-center">
            إعادة تعيين كلمة المرو
          </h1>
          <p className="text-sm text-black/70 text-center leading-relaxed">
            فضلاً، أدخل رمز التحقق الذي أرسلناه إلى بريدك الإلكتروني، واختر كلمة
            مرور جديدة لحسابك.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 w-full"
          >
            <div className="space-y-2">
              {RESET_PASSWORD_FORM_INPUTS.map((input) => (
                <div className="w-full" key={input.name}>
                  <FormField
                    control={form.control}
                    name={
                      input.name as keyof z.infer<typeof resetPasswordSchema>
                    }
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black" htmlFor={input.name}>
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
                                className="pr-2 pl-9 py-3 focus-visible:ring-[#bababa] placeholder:h-14 h-auto border-black/20 text-black placeholder:text-black/50"
                              />
                            </div>
                          ) : (
                            <Input
                              id={input.name}
                              placeholder={input.placeholder}
                              type={input.type}
                              {...field}
                              className="px-2 py-3 focus-visible:ring-[#bababa] placeholder:h-14 h-auto border-black/20 text-black placeholder:text-black/50"
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
            <Button
              disabled={isPending}
              className="h-auto bg-[#16a0cf] hover:bg-[#16a0cf]/90 text-white w-full py-3.5 px-4 flex justify-center items-center gap-4"
            >
              إعادة تعيين كلمة المرور
              {isPending && <Loader2 className="animate-spin" />}
            </Button>
          </form>
        </Form>
      </motion.div>
    </>
  );
};

export default ResetPassword;
