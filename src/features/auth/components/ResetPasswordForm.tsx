import { RenderAuthFormFields } from "./RenderAuthFormFields";
import { useEffect } from "react";
import { Form } from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useResetPassword } from "@/features/auth/queriesAndMutations";
import cookieServices from "@/shared/utils/cookieServices";
import Swal from "sweetalert2";
import { resetPasswordSchema } from "../schema";
import { RESET_PASSWORD_FORM_INPUTS } from "../constants";

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
      navigate("/sign-in");
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
          size={"lg"}
          type="submit"
          className="w-full text-white"
        >
          إعادة تعيين كلمة المرور
          {isPending && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
