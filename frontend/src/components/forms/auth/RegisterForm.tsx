import RenderAuthFormFields from "@/components/forms/auth/RenderAuthFormFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { REGISTER_FORM_INPUTS } from "@/constants";
import { useUploadImgHandler } from "@/hooks/useUploadImgHandler";
import { useRegister } from "@/lib/react-query/auth/auth";
import { registerSchema } from "@/validations/auth/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import handleResErr from "@/utils/handleResponseError";
import { useDispatch } from "react-redux";
import { login } from "@/store/features/auth/authSlice";
import { setPermissions } from "@/store/features/permissions/permissionsSlice";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutateAsync: register, isPending } = useRegister();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      another_name: "",
      first_phone: "",
      name: "",
      personal_id: "",
      second_phone: "",
      email: "",
      gender: "male",
      password: "",
      personal_image: undefined,
    },
  });

  const onSubmit = async (user: z.infer<typeof registerSchema>) => {
    console.log(user);
    try {
      const { data, message, status } = await register(user);
      if (!status)
        return Swal.fire({
          icon: "error",
          title: "خطأ",
          text: message,
        });

      Swal.fire({
        icon: "success",
        title: "تم التسجيل بنجاح",
        text: message,
      });
      dispatch(
        login({
          token: data.token,
          user: {
            id: data.id,
            name: data.name,
            role: data.role,
          },
        })
      );
      dispatch(setPermissions(data.permissions));
      form.reset();
      navigate("/verify-account");
    } catch (error) {
      handleResErr(error);
    }
  };

  const { handleFileChange } = useUploadImgHandler(form);

  const isOptionalField = (fieldName: string) =>
    ["another_name", "second_phone"].includes(fieldName);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 w-full max-w-md lg:max-w-full mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2">
          {REGISTER_FORM_INPUTS.map((input) => (
            <div className="w-full" key={input.name}>
              <RenderAuthFormFields
                form={form}
                input={input}
                isOptionalField={isOptionalField}
                schema={registerSchema}
                handleFileChange={handleFileChange}
              />
            </div>
          ))}
        </div>
        <Button
          disabled={isPending}
          className="h-auto bg-[#16a0cf] hover:bg-[#16a0cf]/90 text-[#fff] w-full py-4 px-4 flex justify-center items-center gap-4"
        >
          إنشاء حساب {isPending && <Loader2 className="animate-spin" />}
        </Button>
      </form>
      <p className="mt-2 text-sm text-dark text-center">
        لديك حساب بالفعل؟{" "}
        <Link to={"/login"} className="underline text-[#000]">
          تسجيل الدخول
        </Link>
      </p>
    </Form>
  );
};

export default RegisterForm;
