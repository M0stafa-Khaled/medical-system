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
  AlertDialogCancel,
  AlertDialogFooter,
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
import Modal from "@/components/shared/Modal";
import cookieServices from "@/utils/cookieServices";

const AddClinicModalButton = () => {
  const token = cookieServices.getToken() || "";
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
      } = await createClinic({
        name,
        status,
        token,
      });

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

  const handleCloseModal = () => {
    setIsOpenAddModal(false);
    form.reset();
  };

  return (
    <>
      <Button
        onClick={() => setIsOpenAddModal(true)}
        size={"sm"}
        variant={"outline"}
        className="bg-primary md:bg-transparent md:text-primary text-primary-foreground gap-2 hover:!bg-primary hover:!text-white !border-primary dark:hover:!text-black py-6 !rounded-lg font-semibold"
      >
        إضافة عيادة جديدة
        <FiPlus size={20} />
      </Button>

      <Modal
        isOpen={isOpenAddModal}
        onOpenChange={handleCloseModal}
        title="إضافة عيادة جديدة"
        description="يمكنك اضافة عيادة جديدة من هنا"
        showFooter={false}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      className="data-[state=unchecked]:bg-black/50 data-[state=checked]:bg-green-700 dark:data-[state=unchecked]:bg-white/50 dark:data-[state=checked]:bg-green-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <AlertDialogFooter className="text-start !justify-start gap-2">
              <AlertDialogCancel
                onClick={handleCloseModal}
                className="text-black dark:text-white py-3 h-auto"
              >
                إلغاء
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={isPending}
                className="py-3 h-auto"
              >
                إضافة
                {isPending && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default AddClinicModalButton;
