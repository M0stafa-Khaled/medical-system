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
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForgotPassword } from "@/features/auth/queriesAndMutations";
import cookieServices from "@/utils/cookieServices";
import Swal from "sweetalert2";
import { forgotPasswordSchema } from "../schema";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

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
                    <FormLabel className="text-black">
                      البريد الإلكتروني
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="البريد الإلكتروني"
                        type="text"
                        {...field}
                        className="h-auto border-black/20 px-2 py-2.5 text-black placeholder:h-14 placeholder:text-black/50 focus-visible:ring-[#bababa] md:py-3.5"
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
          className="flex h-auto w-full items-center justify-center gap-4 bg-[#16a0cf] px-4 py-3.5 text-white hover:bg-[#16a0cf]/90"
        >
          إرسال رمز إعادة التعيين
          {isPending && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
