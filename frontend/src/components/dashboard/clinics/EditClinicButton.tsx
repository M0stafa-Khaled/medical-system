import { FaPencil } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import clinicSchema from "@/validations/clinicSchema";

const EditClinicButton = () => {
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);

  const form = useForm<z.infer<typeof clinicSchema>>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = (data: z.infer<typeof clinicSchema>) => {
    console.log(data);
    setIsOpenEditModal(false);
    form.reset();
  };

  return (
    <div>
      <Button
        onClick={() => {
          setIsOpenEditModal(true);
        }}
        size={"sm"}
        className="bg-primary text-white dark:text-black gap-2 text-sm"
      >
        تعديل
        <FaPencil size={18} />
      </Button>

      {/* Edit Modal */}
      <AlertDialog
        open={isOpenEditModal}
        onOpenChange={() =>
          setIsOpenEditModal((prev) => {
            form.reset();
            return !prev;
          })
        }
      >
        <AlertDialogContent className="border-muted">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black dark:text-white text-center">
              تعديل العيادة
            </AlertDialogTitle>
            <AlertDialogDescription className="text-start">
              تعديل عيادة{" "}
              <span className="font-bold text-black dark:text-white">
                {"عظام"}
              </span>
              ؟
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
                      <FormControl>
                        <Input
                          placeholder="اسم العيادة"
                          {...field}
                          value={form.getValues("name")}
                          onChange={(e) =>
                            form.setValue("name", e.target.value)
                          }
                          className="text-black dark:text-white border-muted h-auto py-3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <AlertDialogFooter className="text-start !justify-start gap-2">
                  <AlertDialogCancel className="text-black dark:text-white">
                    إلغاء
                  </AlertDialogCancel>
                  <Button type="submit">حفظ</Button>
                </AlertDialogFooter>
              </form>
            </Form>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditClinicButton;
