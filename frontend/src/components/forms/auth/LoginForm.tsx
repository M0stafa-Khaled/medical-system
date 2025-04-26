import { login } from "@/store/features/auth/authSlice";
import { setPermissions } from "@/store/features/permissions/permissionsSlice";
import { Form } from "@/components/ui/form";
import { LOGIN_FORM_INPUTS } from "@/constants";
import { useLogin } from "@/lib/react-query/auth/auth";
import { loginSchema } from "@/validations/auth/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import handleResErr from "@/utils/handleResponseError";
import Swal from "sweetalert2";
import RenderAuthFormFields from "./RenderAuthFormFields";

const LoginForm = () => {
  const navigate = useNavigate();
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
          user: {
            role: data.role,
            id: data.id,
            name: data.name,
          },
        })
      );
      if (data.role === "admin") return navigate("/dashboard");
      // if (data.role === "employee") navigate("/dashboard/bookings");
      if (data.role === "patient") navigate("/bookings");
      if (data.role === "doctor") navigate("/doctor");

      // Permissions
      if (data.role !== "patient") dispatch(setPermissions(data.permissions));

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
        className="space-y-3 w-full max-w-md lg:max-w-full"
      >
        <div>
          <div className="space-y-4">
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
          className="h-auto bg-[#16a0cf] hover:bg-[#16a0cf]/90 text-[#fff] w-full py-3.5 px-4 flex justify-center items-center gap-4"
        >
          تسجيل الدخول
          {isPending && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
