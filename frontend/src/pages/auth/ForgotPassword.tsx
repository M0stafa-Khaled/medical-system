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
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { forgotPasswordSchema } from "@/validations/authSchema";
import { useForgotPassword } from "@/lib/react-query/auth/auth";
import cookieServices from "@/utils/cookieServices";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async ({ email }: z.infer<typeof forgotPasswordSchema>) => {
    try {
      const { status, message } = await forgotPassword(email);

      // ! Send failed
      if (!status) return toast.error(message);
      // * Send Success
      cookieServices.setCanResetPass();
      navigate("/reset-password");
      return toast.success(message);
    } catch (error) {
      const errorObj = error as AxiosError<{
        message: { [key: string]: string[] };
      }>;
      if (errorObj?.response?.data.message) {
        Object.keys(errorObj.response.data.message).forEach((key) => {
          errorObj?.response?.data.message[key].forEach((error) =>
            toast.error(error, {
              autoClose: 5000,
            })
          );
        });
      }
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
            لا تقلق، سنساعدك على استعادة حسابك!
          </h1>
          <p className="text-sm text-black/70 text-center leading-relaxed">
            يرجى إدخال بريدك الإلكتروني المرتبط بحسابك، وسنقوم بإرسال رمز تحقق
            يمكنك استخدامه لإعادة تعيين كلمة المرور الخاصة بك.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 w-full"
          >
            <div>
              <div className="space-y-4">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">
                          البريد الإلكتروني
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="البريد الإلكتروني"
                            type="text"
                            {...field}
                            className="px-2 py-3 focus-visible:ring-[#bababa] placeholder:h-14 h-auto border-black/20 text-black placeholder:text-black/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <Button
              disabled={isPending}
              className="h-auto bg-[#16a0cf] hover:bg-[#16a0cf]/90 text-white w-full py-3 px-4 flex justify-center items-center gap-4"
            >
              إرسال رمز إعادة التعيين
              {isPending && <Loader2 className="animate-spin" />}
            </Button>
          </form>
        </Form>
      </motion.div>
    </>
  );
};

export default ForgotPassword;
