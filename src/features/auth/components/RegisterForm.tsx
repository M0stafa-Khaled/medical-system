import { RenderAuthFormFields } from "@/features/auth/components/RenderAuthFormFields";
import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import { useUploadImgHandler } from "@/shared/hooks/useUploadImgHandler";
import { useRegister } from "@/features/auth/queriesAndMutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { handleResErr } from "@/shared/utils/handleResError";
import { useDispatch } from "react-redux";
import { login } from "@/app/store/features/auth/authSlice";
import Swal from "sweetalert2";
import { registerSchema } from "../schema";
import { REGISTER_FORM_INPUTS } from "../constants";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutateAsync: register, isPending } = useRegister();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_phone: "",
      name: "",
      personal_id: "",
      email: "",
      gender: "male",
      password: "",
      personal_image: undefined,
    },
  });

  const onSubmit = async (user: z.infer<typeof registerSchema>) => {
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
          user: data,
        })
      );
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
        className="mx-auto w-full max-w-md space-y-3 lg:max-w-full"
      >
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
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
        <Button disabled={isPending} size="lg" className="w-full text-white">
          إنشاء حساب {isPending && <Loader2 className="animate-spin" />}
        </Button>
      </form>
      <p className="text-muted-foreground mt-2 text-sm dark:text-gray-400">
        لديك حساب بالفعل؟{" "}
        <Link
          to={"/sign-in"}
          className="text-primary hover:text-primary/80 dark:hover:text-primary/90 font-medium underline transition-colors"
        >
          تسجيل الدخول
        </Link>
      </p>
    </Form>
  );
};
