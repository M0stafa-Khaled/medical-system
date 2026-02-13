import { RenderAuthFormFields } from "./RenderAuthFormFields";
import { useEffect } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useResetPassword } from "@/features/auth/queriesAndMutations";
import cookieServices from "@/utils/cookieServices";
import { RESET_PASSWORD_FORM_INPUTS } from "@/constants";
import Swal from "sweetalert2";
import { resetPasswordSchema } from "../schema";

export const ResetPasswordForm = () => {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        <div className="space-y-2">
          {RESET_PASSWORD_FORM_INPUTS.map((input) => (
            <div className="w-full" key={input.name}>
              <RenderAuthFormFields
                form={form}
                input={input}
                schema={resetPasswordSchema}
              />
            </div>
          ))}
        </div>
        <Button
          disabled={isPending}
          className="flex h-auto w-full items-center justify-center gap-4 bg-[#16a0cf] px-4 py-3.5 text-white hover:bg-[#16a0cf]/90"
        >
          إعادة تعيين كلمة المرور
          {isPending && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
