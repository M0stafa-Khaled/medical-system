import { memo, useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import cookieServices from "@/utils/cookieServices";
import { motion } from "framer-motion";
import RenderFormFields from "@/components/forms/dashboard/RenderFormFields";
import {
  itemVariants,
  containerVariants,
} from "@/animations/dashboardAnimations";
import categorySchema from "@/validations/categorySchema";
import { IExpenseCategory } from "@/interfaces/dashboard/expenses/expenseCategory";
import { FaPencil } from "react-icons/fa6";
import { useUpdateExpenseCategory } from "@/lib/react-query/dashboard/expenses/expensesCategories";

interface IProps {
  category: IExpenseCategory;
}
const UpdateExpenseCategory = ({ category }: IProps) => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: updateCategory, isPending } = useUpdateExpenseCategory();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
    },
  });

  const onSubmit = async ({ name }: z.infer<typeof categorySchema>) => {
    try {
      const { status, message } = await updateCategory({
        id: `${category.id}`,
        token,
        name,
      });

      // ! Update failed
      if (!status) return toast.error(message);

      // * Update Success
      return toast.success(message);
    } catch (error) {
      const errorObj = error as AxiosError<{
        errors: { [key: string]: string[] };
        message: string;
      }>;
      if (errorObj?.response?.data.errors) {
        Object.keys(errorObj.response.data.errors).forEach((key) => {
          errorObj?.response?.data.errors[key].forEach((error) =>
            toast.error(error, {
              autoClose: 5000,
            })
          );
        });
      }
      if (
        errorObj?.response?.data.message &&
        !errorObj?.response?.data.errors
      ) {
        toast.error(errorObj?.response?.data.message, {
          autoClose: 5000,
        });
      }
    } finally {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    form.reset({
      name: category.name,
    });
  };
  useEffect(() => {
    form.reset({
      name: category.name,
    });
  }, [form, category]);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        className="bg-primary  bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm py-1 px-1 w-8 h-8"
      >
        <FaPencil size={24} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="تعديل تصنيف"
        description={{
          text: "يمكنك تعديل التصنيف المحدد هنا",
        }}
        showFooter={false}
      >
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 text-black dark:text-white"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div custom={"category-name"} variants={itemVariants}>
              <RenderFormFields
                input={{
                  name: "name",
                  label: "اسم التصنيف",
                  type: "text",
                  placeholder: "اسم التصنيف",
                }}
                form={form}
                schema={categorySchema}
              />
            </motion.div>

            <AlertDialogFooter className="text-start !justify-start gap-2">
              <AlertDialogCancel
                onClick={handleCloseModal}
                className="text-black dark:text-white py-2.5 h-auto"
              >
                إلغاء
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={isPending}
                className="py-2.5 h-auto"
              >
                تعديل
                {isPending && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default memo(UpdateExpenseCategory);
