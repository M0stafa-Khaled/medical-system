import { login } from "@/app/store/features/auth/authSlice";
import { Form } from "@/shared/components/ui/form";
import { useLogin } from "@/features/auth/queriesAndMutations";
import { loginSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { handleResErr } from "@/shared/utils/handleResError";
import Swal from "sweetalert2";
import { RenderAuthFormFields } from "./RenderAuthFormFields";
import { LOGIN_FORM_INPUTS } from "../constants";

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutateAsync: loginUser, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async ({ email, password }: z.infer<typeof loginSchema>) => {
    try {
      const { status, message, data } = await loginUser({
        email,
        password,
      });

      // ! Login failed
      if (!status)
        return Swal.fire({
          icon: "error",
          title: "خطأ",
          text: message,
        });

      // * Login Success
      dispatch(
        login({
          token: data.token,
          user: data,
        })
      );

      if (data.role === "admin" || data.role === "employee")
        return navigate("/dashboard");
      if (data.role === "patient") navigate("/patient");
      if (data.role === "doctor") navigate("/doctor");

      return Swal.fire({
        icon: "success",
        title: "تم تسجيل الدخول بنجاح",
        text: "يمكنك الآن المتابعة",
      });
    } catch (error) {
      handleResErr(error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-3 lg:max-w-full"
      >
        <div>
          <div className="space-y-2">
            {LOGIN_FORM_INPUTS.map((input) => (
              <div className="w-full" key={input.name}>
                <RenderAuthFormFields
                  form={form}
                  input={input}
                  schema={loginSchema}
                />
              </div>
            ))}
          </div>
          <Link
            to={"/forgot-password"}
            className="text-primary dark:text-primary hover:text-primary/80 dark:hover:text-primary/90 mt-1 mr-2 text-sm font-medium underline transition-colors"
          >
            هل نسيت كلمة المرور؟
          </Link>
        </div>
        <Button
          disabled={isPending}
          type="submit"
          className="w-full text-white"
          size={"lg"}
        >
          تسجيل الدخول
          {isPending && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
