import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForgotPassword } from "@/features/auth/queriesAndMutations";
import cookieServices from "@/shared/utils/cookieServices";
import Swal from "sweetalert2";
import { forgotPasswordSchema } from "../schema";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/shared/components/ui/input";

export const ForgotPasswordForm = () => {
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
      if (!status)
        return Swal.fire({
          icon: "error",
          title: "خطأ",
          text: message,
        });
      // * Send Success
      cookieServices.setCanResetPass();
      navigate("/reset-password");
      return Swal.fire({
        icon: "success",
        title: "تم",
        text: message,
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        <div>
          <div className="space-y-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="text-foreground font-medium dark:text-white"
                      htmlFor={"email"}
                    >
                      البريد الإلكتروني
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="البريد الإلكتروني"
                        type="text"
                        {...field}
                        className="border-border text-foreground placeholder:text-muted-foreground focus:ring-primary dark:focus:ring-primary/50 h-auto py-3 transition-colors dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <Button disabled={isPending} size={"lg"} className="w-full text-white">
          إرسال رمز إعادة التعيين
          {isPending && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
