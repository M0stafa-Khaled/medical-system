import { containerVariants, itemVariants } from "@/animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useUploadImgHandler } from "@/hooks/useUploadImgHandler";
import {
  useGetCompanyInfo,
  useUpdateCompanyInfo,
} from "@/lib/react-query/dashboard/company";
import cookieServices from "@/utils/cookieServices";
import handleResErr from "@/utils/handleResponseError";
import { companySchema } from "@/validations/dashboard/companySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

const CompanyInfo = () => {
  const token = cookieServices.getToken()!;
  const { data: company, isLoading } = useGetCompanyInfo(token);
  const { mutateAsync: updateCompany, isPending } = useUpdateCompanyInfo();
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name_manager: "",
      phone_manager: "",
      logo: undefined,
    },
  });

  const { register, reset, control, handleSubmit } = form;

  const { handleFileChange } = useUploadImgHandler(form);

  useEffect(() => {
    reset({
      name_manager: company?.data.name_manager || "",
      phone_manager: company?.data.phone_manager || "",
    });
  }, [reset, company]);

  const onSubmit = async (data: z.infer<typeof companySchema>) => {
    try {
      const { message, status } = await updateCompany({ token, company: data });
      if (!status)
        return Swal.fire({
          icon: "error",
          title: "خطأ",
          text: message,
        });

      Swal.fire({
        icon: "success",
        title: "تم",
        text: message,
      });
    } catch (error) {
      handleResErr(error);
    }
  };

  if (isLoading)
    return (
      <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-xs my-2">
        <CardHeader>
          <CardTitle>بيانات الشركة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            {Array.from({ length: 5 }, (_, idx) => (
              <Skeleton key={idx} className="h-14 w-full" />
            ))}
          </div>
          <Skeleton className="h-14 w-52 mt-6" />
        </CardContent>
      </Card>
    );

  const COMPANY_INPUTS = [
    {
      label: "الاسم",
      name: "name",
      value: company?.data.name || "الاسم",
      disabled: true,
    },
    {
      label: "البريد الإلكتروني",
      name: "email",
      value: company?.data.email || "البريد الإلكتروني",
      disabled: true,
    },
    {
      label: "اسم المدير",
      name: "name_manager",
      value: company?.data.name_manager || "اسم المدير",
      disabled: false,
    },
    {
      label: "رقم الهاتف",
      name: "phone_manager",
      value: company?.data.phone_manager || "رقم الهاتف",
      disabled: false,
    },
    {
      label: "الشعار",
      name: "logo",
      accept: ".png, .jpg, .jpeg",
      disabled: false,
    },
  ];

  return (
    <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-xs my-2">
      <CardHeader>
        <CardTitle>بيانات الشركة</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
            >
              {COMPANY_INPUTS.map((input) => (
                <motion.div key={input.name} variants={itemVariants}>
                  <FormField
                    key={input.name}
                    name={input.name as keyof z.infer<typeof companySchema>}
                    control={control}
                    render={({ field }) =>
                      input.name === "logo" ? (
                        <FormItem>
                          <FormLabel htmlFor={input.name}>
                            {input.label}:
                            <span className="text-xs text-muted-foreground">
                              {" "}
                              (اختياري)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              id={input.name}
                              type="file"
                              accept={input.accept}
                              {...field}
                              onChange={(e) =>
                                handleFileChange(e, field.onChange)
                              }
                              value={undefined}
                              className="cursor-pointer border-muted h-auto py-2.5 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:cursor-pointer"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      ) : (
                        <FormItem>
                          <FormLabel htmlFor={input.name}>
                            {input.label}:
                          </FormLabel>
                          <FormControl>
                            <Input
                              id={input.name}
                              type="text"
                              placeholder={input.value}
                              value={
                                input.disabled
                                  ? input.value
                                  : (field.value as string)
                              }
                              {...register(
                                input.name as keyof z.infer<
                                  typeof companySchema
                                >
                              )}
                              autoComplete="on"
                              className="border-muted py-3 placeholder:h-14 h-auto text-black dark:text-white placeholder:text-muted-foreground placeholder:text-sm disabled:opacity-80"
                              disabled={input.disabled}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }
                  />
                </motion.div>
              ))}
            </motion.div>
            <Button
              type="submit"
              className="disabled:cursor-not-allowed disabled:pointer-events-auto h-auto w-auto py-3 px-6 mt-4"
              disabled={
                isPending ||
                (company?.data.name_manager ===
                  form.getValues("name_manager") &&
                  company?.data.phone_manager ===
                    form.getValues("phone_manager") &&
                  form.getValues("logo") === undefined)
              }
            >
              تحديث البيانات
              {isPending && <Loader2 className="animate-spin ml-2" />}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CompanyInfo;
