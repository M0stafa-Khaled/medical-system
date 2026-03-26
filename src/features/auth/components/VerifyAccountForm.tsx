import { logout } from "@/app/store/features/auth/authSlice";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import Swal from "sweetalert2";
import { useResendOtp, useVerifyAccount } from "../queriesAndMutations";
import { AxiosError } from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import { useAppDispatch } from "@/app/store";
import { useNavigate } from "react-router";
import cookieService from "@/shared/utils/cookieServices";

const formSchema = z.object({
  otp: z
    .string()
    .min(6, "يجب إدخال رمز التحقق")
    .max(6, "يجب إدخال رمز التحقق "),
});

type FormValues = z.infer<typeof formSchema>;

export const VerifyAccountForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const role = cookieService.getUser()?.role;
  const { mutateAsync: resendOtp, isPending: isLoadingResendOtp } =
    useResendOtp();
  const { mutateAsync: verifyAccount, isPending: isLoadingVerify } =
    useVerifyAccount();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const { status, message } = await verifyAccount({
        otp: values.otp,
      });
      if (!status)
        return Swal.fire({
          icon: "error",
          title: "خطأ",
          text: message,
        });
      Swal.fire({
        icon: "success",
        title: "تم التأكيد",
        text: "تم تأكيد البريد الإلكتروني بنجاح",
      });
      if (role === "admin" || role === "employee")
        return navigate("/dashboard");
      if (role === "doctor") return navigate("/doctor");
      if (role === "patient") return navigate("/patient");
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

  const handleResendOtp = async () => {
    try {
      const { message, status } = await resendOtp();
      if (!status) return toast.error(message);

      toast.success("تم ارسال رمز التحقق مرة اخرى");
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex justify-center" dir="ltr">
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                    autoFocus
                  >
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        className="border-muted h-12 w-12"
                      />
                      <InputOTPSlot
                        index={1}
                        className="border-muted h-12 w-12"
                      />
                      <InputOTPSlot
                        index={2}
                        className="border-muted h-12 w-12"
                      />
                      <InputOTPSlot
                        index={3}
                        className="border-muted h-12 w-12"
                      />
                      <InputOTPSlot
                        index={4}
                        className="border-muted h-12 w-12"
                      />
                      <InputOTPSlot
                        index={5}
                        className="border-muted h-12 w-12"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </FormControl>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mt-2 w-full"
          disabled={isLoadingVerify}
        >
          تأكيد
        </Button>
        <p className="text-muted-foreground text-center text-sm">
          لم يصلك رمز التحقق؟{" "}
          <Button
            variant="link"
            className="h-auto p-0"
            onClick={handleResendOtp}
            type="button"
            disabled={isLoadingResendOtp}
          >
            اضغط لإعادة الإرسال
          </Button>
        </p>
      </form>
      <Button
        onClick={() => {
          dispatch(logout());
          navigate("/login");
        }}
        type="submit"
        variant={"destructive"}
        className="mt-2 h-auto w-full text-white"
      >
        تسجيل الخروج
      </Button>
    </Form>
  );
};
