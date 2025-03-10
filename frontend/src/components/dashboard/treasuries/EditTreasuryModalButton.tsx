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
import RenderFormFields from "@/components/forms/RenderFormFields";
import {
  itemVariants,
  containerVariants,
} from "@/animations/dashboardAnimations";
import treasurySchema from "@/validations/treasurySchema";
import { FaPencil } from "react-icons/fa6";
import { ITreasury } from "@/interfaces/dashboard/treasury";
import { useUpdateTreasury } from "@/lib/react-query/treasuries";
import { TREASURY_FORM_INPUTS } from "@/constants";

interface IProps {
  treasury: ITreasury;
}

const EditTreasuryButton = ({ treasury }: IProps) => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: updateTreasury, isPending } = useUpdateTreasury();

  const form = useForm<z.infer<typeof treasurySchema>>({
    resolver: zodResolver(treasurySchema),
    defaultValues: {
      name: treasury.name,
      status: treasury.status,
    },
  });

  const onSubmit = async ({ name, status }: z.infer<typeof treasurySchema>) => {
    try {
      const { status: serverStatus, message } = await updateTreasury({
        id: `${treasury.id}`,
        token,
        status,
        name,
      });

      // ! Update failed
      if (!serverStatus) return toast.error(message);

      // * Update Success
      return toast.success(message || "تم تحديث بيانات الخزينة بنجاح");
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
    } finally {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    form.reset({
      name: treasury.name,
    });
  };
  useEffect(() => {
    form.reset({
      name: treasury.name,
      status: treasury.status,
    });
  }, [form, treasury]);

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
            {TREASURY_FORM_INPUTS.map((input, idx) => (
              <motion.div key={input.name} custom={idx} variants={itemVariants}>
                <RenderFormFields
                  input={input}
                  form={form}
                  schema={treasurySchema}
                />
              </motion.div>
            ))}

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

export default memo(EditTreasuryButton);
