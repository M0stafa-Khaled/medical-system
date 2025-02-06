import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import clinicSchema from "@/validations/clinicSchema";
import { Switch } from "@/components/ui/switch";
import { useCreateClinic } from "@/lib/react-query/clinics";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";

const AddClinicModalButton = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const { mutateAsync: createClinic, isPending } = useCreateClinic();

  const form = useForm<z.infer<typeof clinicSchema>>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: "",
      status: true,
    },
  });

  const onSubmit = async ({ name, status }: z.infer<typeof clinicSchema>) => {
    try {
      const {
        status: statusServer,
        message,
        data,
      } = await createClinic({ name, status });

      // ! Update Field
      if (!statusServer) return toast.error(message);

      // * Update Success
      return toast.success(`${message} '${data.name}'`);
    } catch (error) {
      const errorObj = error as AxiosError<{ message: string }>;
      toast.error(errorObj.response?.data.message || "هناك خطأ حاول لاحقا");
    } finally {
      setIsOpenAddModal(false);
      form.reset();
    }
  };

  return (
    <>
      <div className="mb-8">
        <Button
          onClick={() => setIsOpenAddModal(true)}
          size={"sm"}
          variant={"outline"}
          className="gap-2 !text-primary hover:!bg-primary hover:!text-white !border-primary dark:hover:!text-black py-6 !rounded-lg font-semibold"
        >
          إضافة عيادة جديدة
          <FiPlus size={20} />
        </Button>
      </div>
      {/* Edit Modal */}
      <AlertDialog
        open={isOpenAddModal}
        onOpenChange={() =>
          setIsOpenAddModal((prev) => {
            form.reset();
            return !prev;
          })
        }
      >
        <AlertDialogContent className="border-muted !z-[1000] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black dark:text-white text-center">
              إضافة عيادة جديدة
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              يمكنك اضافة عيادة جديدة من هنا
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-fit leading-relaxed text-black dark:text-white">
                        اسم العيادة:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="اسم العيادة"
                          {...field}
                          value={form.getValues("name")}
                          onChange={(e) =>
                            form.setValue("name", e.target.value)
                          }
                          className="py-3 placeholder:h-14 h-auto border-black/20 text-black dark:text-white dark:border-white/40 placeholder:text-black/50 dark:placeholder:text-white/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-4">
                      <FormLabel className="text-black dark:text-white">
                        متاحة:
                      </FormLabel>
                      <FormControl>
                        <Switch
                          dir="ltr"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=unchecked]:bg-black/50 dark:data-[state=unchecked]:bg-white/50"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <AlertDialogFooter className="text-start !justify-start gap-2">
                  <AlertDialogCancel className="text-black dark:text-white">
                    إلغاء
                  </AlertDialogCancel>
                  <Button type="submit" disabled={isPending}>
                    إضافة
                    {isPending && <Loader2 className="animate-spin" />}
                  </Button>
                </AlertDialogFooter>
              </form>
            </Form>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddClinicModalButton;
