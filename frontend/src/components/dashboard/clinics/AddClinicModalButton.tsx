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
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import clinicSchema from "@/validations/clinicSchema";

const AddClinicModalButton = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const form = useForm<z.infer<typeof clinicSchema>>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = (data: z.infer<typeof clinicSchema>) => {
    console.log(data);
    setIsOpenAddModal(false);
    form.reset();
  };

  return (
    <>
      <div className="mb-8">
        <Button
          onClick={() => setIsOpenAddModal(true)}
          size={"sm"}
          variant={"outline"}
          className="gap-2 !text-primary hover:!bg-primary hover:!text-white !border-primary dark:hover:!text-black py-6 !rounded-lg !text-xs lg:!text-sm"
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
        <AlertDialogContent className="border-muted">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black dark:text-white text-center">
              إضافة عيادة جديدة
            </AlertDialogTitle>
            <AlertDialogDescription className="text-start">
              اسم العيادة:
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
                  <Button type="submit">إضافة</Button>
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
